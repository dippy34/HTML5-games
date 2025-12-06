# GitHub Actions Workflows

## Deploy to AWS Lightsail

This workflow automatically deploys your application to AWS Lightsail when you push to the `main` branch.

### ⚠️ About Linter Warnings

You may see linter warnings like:
- `Context access might be invalid: LIGHTSAIL_HOST`
- `Context access might be invalid: LIGHTSAIL_USER`  
- `Context access might be invalid: LIGHTSAIL_SSH_KEY`

**These warnings are expected and safe to ignore.** They appear because the linter can't verify that secrets exist in your repository. The workflow will work correctly once you configure the secrets as described below.

### Setup Required Secrets

Before using this workflow, you must add these secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:

   - **LIGHTSAIL_HOST**: Your Lightsail instance's static IP address (e.g., `54.123.45.67`)
   - **LIGHTSAIL_USER**: SSH username (usually `bitnami` for Node.js instances)
   - **LIGHTSAIL_SSH_KEY**: Your private SSH key content (the entire key, including `-----BEGIN` and `-----END` lines)

### Getting Your SSH Key

If you don't have an SSH key yet:

1. **Download from Lightsail**:
   - Go to Lightsail Console → Your instance
   - Click **Account** → **SSH keys**
   - Download your default key or create a new one

2. **Or generate a new key**:
   ```bash
   ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
   ```
   Then add the public key to your Lightsail instance.

### How It Works

1. When you push to `main` branch, the workflow triggers
2. It connects to your Lightsail instance via SSH
3. Pulls the latest code from your repository
4. Installs dependencies
5. Restarts the application with PM2

### Manual Trigger

You can also trigger the deployment manually:
- Go to **Actions** tab in GitHub
- Select **Deploy to AWS Lightsail** workflow
- Click **Run workflow**

### Troubleshooting

**Error: "Host key verification failed"**
- Add your Lightsail host to known hosts or use `strict: false` in the workflow

**Error: "Permission denied"**
- Verify your SSH key is correct
- Ensure the user has permissions to access `/opt/nova-hub`
- Check that the SSH key is added to the user's `~/.ssh/authorized_keys`

**Error: "pm2: command not found"**
- PM2 must be installed on the Lightsail instance
- Run: `npm install -g pm2` on your Lightsail instance

