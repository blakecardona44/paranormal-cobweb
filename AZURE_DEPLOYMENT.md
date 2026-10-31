# Azure Container Apps preparation

## Start in Azure

1. Create an Azure account and activate a subscription at https://portal.azure.com/.
2. Create a resource group named `martinez-app` in a region near your MongoDB database.
3. Create a Cost Management budget with notifications. A budget alerts you; it does not cap spending.
4. Wait to create the production Container App until the storage items below are complete.

## Container build

Run commands from `simple-next-ts`, not the parent directory. The Docker build context excludes
local environment files and credentials. Never pass database passwords or session secrets as build arguments.

```sh
docker build --platform linux/amd64 \
  --build-arg NEXT_PUBLIC_SITE_URL=https://advisor.elizabethjudithmartinez.com \
  --build-arg NEXT_PUBLIC_IMAGE_SERVER=https://YOUR-QUOTE-SERVER \
  -t martinez-web:local .
```

Supply other public settings used by your deployment with the corresponding Docker build arguments.
Next.js embeds browser-facing `NEXT_PUBLIC_*` settings at build time; changing runtime settings does
not update the browser bundle. The image builds articles from bundled JSON for a reproducible build.

For a local production smoke test, use a private, untracked runtime environment file:

```sh
docker run --rm --env-file .env.local \
  -e NODE_ENV=production -e HOSTNAME=0.0.0.0 -e PORT=3000 \
  -p 127.0.0.1:8085:3000 martinez-web:local
```

Visit http://localhost:8085. Local cookies may require HTTPS depending on your production session settings.

### Local validation completed

The Linux/AMD64 image `martinez-web:local` was built and smoke-tested with 0.5 CPU and 1 GiB RAM.
The test container is named `martinez-local-smoke` and listens on http://localhost:8085.

Verified: homepage, login, registration, admin login, sitemap, robots, manifest, logo, 39 JS/CSS
assets, runtime image optimization, anonymous dashboard redirects, MongoDB connectivity, and
reading the shared five-coin snapshot. The runtime is non-root and contains no `.env` files.
Database-writing dummy routes are explicitly dynamic so the image build does not execute them.

Authenticated browser flows, email delivery, payment flows, and Azure networking remain to be
tested. Stop the local test container when finished:

```sh
docker stop martinez-local-smoke
```

## Required before production

Coin prices now use one MongoDB document in the `coinpricesnapshots` collection
(`_id: coinapi-usd`). POST `/api/update-coin-prices` once after setting `COINAPI_KEY`
and `MONGODB_URI` to initialize it; scheduled calls update that same record.
Pending-investment and real-estate pages read MongoDB on each request.
`public/coinData.json` is unchanged and is used only when MongoDB has no usable record
and `ALLOW_BUNDLED_COIN_PRICES=true` is explicitly set at runtime. Leave this off in
production to avoid using stale payment prices; the pages show an unavailable message
until pricing has been initialized. Invalid upstream data does not overwrite saved prices.

- Keep the current local Next.js quote cache for the initial single-replica deployment.
  A restart, deployment, or scale-to-zero can discard it and cause a fresh upstream request.
  Shared persistent caching is deferred.
- Scheduled-job authentication is deferred for now. The workflows and routes remain unchanged
  in that respect.
- Supply `COINAPI_KEY` through Azure secrets. The update route requires it.
- Verify database networking, email delivery, login, registration, admin access, and payment flows
  against the Azure-generated hostname before switching the production domain.

## Runtime configuration

Store sensitive values in Container Apps secrets and reference those secrets from environment variables.
The active mail helper uses the names below, which differ from some entries in `.env.example`:

- `MONGODB_URI`, `IRON_SESSION_PASSWORD`, `JWT_SECRET`
- `COINAPI_KEY`
- `MAIL_SERVER`, `SMTP_PORT`, `USER_NAME`, `PASSWORD`, `EMAIL`
- `BCRYPT_SALT_ROUNDS` if customized

Also supply any other runtime settings used by your existing deployment. Do not upload `.env.local`
to GitHub or paste its values into documentation.

## Container App settings after preparation

Publish the image to a registry (Azure Container Registry or GitHub Container Registry), then create
a Container App using that image:

| Setting | Initial value |
| --- | --- |
| Workload profile | Consumption |
| CPU / memory | 0.5 vCPU / 1 GiB |
| Ingress | External HTTP |
| Target port | 3000 |
| Minimum replicas | 0 |
| Maximum replicas | 1 |
| Revision mode | Single |

This allows scaling between zero and one replica per revision. A single replica can serve
multiple requests concurrently, but cannot scale out under heavy traffic. During deployments,
the old and new revisions can briefly overlap even in Single revision mode.

Configure startup/readiness probes and verify startup logs. Registry, builds, logs, storage, and
networking can have charges independently of the app's compute allowance. Only set up automated
GitHub deployment after the image and runtime configuration have passed the smoke test.

References:
- https://learn.microsoft.com/en-us/azure/container-apps/quickstart-portal
- https://learn.microsoft.com/en-us/azure/container-apps/containerapp-up
- https://learn.microsoft.com/en-us/azure/container-apps/manage-secrets
- https://nextjs.org/docs/14/app/api-reference/next-config-js/output
