# Orange Camara Network APIs Playground - Bruno Collection

A comprehensive Bruno collection for testing Orange's Camara Network APIs Playground without requiring an actual network connection.

## Overview

This collection provides ready-to-use API requests for Orange's implementation of the [CAMARA Project](https://camaraproject.org/) APIs. 
The playground environment allows developers to test and integrate with network APIs in a sandbox environment.

## Prerequisites

- [Bruno](https://www.usebruno.com/) - API client (download and install)
- Node.js (required for JWT generation scripts)
- Valid Orange API credentials (CLIENT_ID, BASIC_CREDS) found on the [Orange Developer Portal](https://developer.orange.com)

## Installation

1. Clone this repository:
```bash
git clone https://github.com/Orange-OpenSource/livenet-collections.git
cd livenet-collections
```

2. Open the collection in Bruno:
   - Launch Bruno
   - Click "Open Collection"
   - Select the `playground/bruno` folder

3. Enable Developer Mode:
   - Once the collection is loaded, **enable Developer Mode** in Bruno
   - This is required for JavaScript scripts to execute properly (authentication flows, token handling, etc.)
   - Without Developer Mode, authentication and pre/post-request scripts will not function

## Configuration

### Environment Variables

A default Bruno Environment (called `Authorization`) is available in this collection.
You need to activate it from the `No Environment` button at the top right of the Bruno application header and select `Authorization`.

Then, configure the following environment variables using your Orange Developer application information (available in your [Orange Developer Portal](https://developer.orange.com/) dashboard):

| Variable | Description | Example |
|----------|-------------|---------|
| `CLIENT_ID` | Your Orange API client identifier | `your-client-id` |
| `BASIC_CREDS` | Your Orange API basic authentication credentials | `NjVKR[...]BzZzY=` |

### Collection Variables

Collection variables can be found in the `Vars` tab of the Playground Collection. 
These variables have default values but you can modify them to suit your scenarios:

| Variable | Description | Example |
|----------|-------------|---------|
| `PHONE_NUMBER` | Phone number for testing (E.164 format) | `+33612345678` |

### Authentication Flows Overview

The collection uses three OAuth 2.0 flows:

#### 1. 2-legged Client Credentials Flow
Located in `Auth/2-legged-client-credentials`
- **Use case**: Server-to-server authentication without user interaction
- **Best for**: Backend services, automated scripts, APIs that don't require user consent
- **Flow**: Direct token exchange using client credentials
- **Authentication**: Client credentials

#### 2. 3-legged Authorization Code Flow
Located in `Auth/3-legged-authorization-code-flow`
- **Use case**: Applications that need user consent and authorization
- **Best for**: Web applications, mobile apps with user interaction
- **Flow**: Standard OAuth 2.0 flow with user consent via browser redirect
- **Features**: Automatically extracts authorization code from redirect
- **Default scope**: `number-verification:verify` (allows Number Verification API only)

#### 3. CIBA (Client Initiated Backchannel Authentication)
Located in `Auth/3-legged-CIBA`
- **Use case**: Decoupled authentication for mobile devices
- **Best for**: Mobile apps where user authentication happens on a different device
- **Flow**: Uses JWT client assertion for authentication
- **Features**: Automatically generates RSA key pairs via `shared-scripts/keystore.js`
- **Default scope**: `sim-swap:check` (allows SIM Swap API only)

> **⚠️ First-time setup required**: Before using CIBA authentication, you **have to** run `Auth/Admin Action JWKS.bru` once. See [Authentication Setup](#authentication-setup) for CIBA flow below.

#### Configuring API Access Scope

For Authorization Code Flow and CIBA, you can modify the `TECHNICAL_PARAMETER` variable to change which APIs you can access:

1. **Edit the variable** in the `vars:pre-request` section of the Authorize request
2. **Available parameters**: See individual API documentation at [Orange Network APIs Documentation](https://docs.developer.orange.com/network-apis)
3. **Multiple APIs**: Concatenate parameters with spaces (e.g., `"number-verification:verify sim-swap:check"`)

**Examples**:
- `number-verification:verify` → Number Verification API
- `sim-swap:check` → SIM Swap API  
- `kyc-match:match` → KYC Match API
- `"number-verification:verify sim-swap:check"` → Both APIs

> **⚠️ Production Note**: While the playground accepts multiple concatenated parameters, production environments may be more restrictive. Test your scope configuration thoroughly.

> **Note**: Choose the appropriate flow based on your use case. Client Credentials for backend services, Authorization Code for user-facing applications, and CIBA for mobile scenarios with device decoupling.

## API Documentation

For complete documentation of all available Camara Network APIs in the playground, including request/response schemas, authentication requirements, and usage examples, visit:

**[Orange Network APIs Documentation](https://docs.developer.orange.com/network-apis)**

This collection includes Bruno requests for all supported playground APIs. 
Each request is pre-configured with the appropriate headers, body structure, and authentication flow.

## Usage

### Initial Setup

1. **Install dependencies**:
```bash
cd playground/bruno
npm install
```

### Authentication Setup

#### For Client Credentials Flow (2-legged)
1. Use `Auth/2-legged-client-credentials/Get Token.bru` (direct token request for server-to-server authentication)

#### For Authorization Code Flow (3-legged)
1. Use `Auth/3-legged-authorization-code-flow/Authorize.bru` (obtain authorization code via user consent)
2. Use `Auth/3-legged-authorization-code-flow/Get Token.bru` (exchange code for access token)

#### For CIBA Flow (3-legged with JWT Client Assertion)
1. **Generate and register JWT keys**:
   - First, run `Auth/Admin Action JWKS.bru` to generate RSA key pair
   - This creates/updates the local keystore (`.keystore.json`)
   - The public key is automatically posted to the playground's authorization server
   
2. **Run CIBA authentication**:
   - Use `Auth/3-legged-CIBA/Authorize.bru`
   - The script automatically retrieves the private key from keystore
   - Generates JWT client assertion for authentication and obtains an authorization request ID
   - Use `Auth/3-legged-CIBA/Get Token.bru`

> **Note**: For more detailed information about 3-legged CIBA with JWT Client Assertion, refer to our comprehensive documentation on the [Orange Developer Portal](https://docs.developer.orange.com/network-apis/practical-guides/api-authentication/backend-flow).

### API Testing

1. **The `accessToken` variable will be automatically set** after successful authentication from any flow

2. **Run any Camara API request** - they all use the `{{accessToken}}` variable

### Workflow Example (CIBA)
```
1. Run Admin Action JWKS.bru → Generates keys + registers public key (needed only once)
2. Run 3-legged-CIBA/Authorize.bru → Uses private key to create JWT assertion + obtains authorization request ID
3. Run 3-legged-CIBA/Get Token.bru → Polls for access token using request ID
4. Access token is automatically extracted and stored
5. Use any Camara API endpoint with the token
```

## Key Features

- **Automatic JWT generation** for CIBA authentication
- **RSA key management** with persistent keystore
- **Pre/post-request scripts** for token handling
- **Ready-to-use test data** for all APIs
- **No redirect following** for proper OAuth flow testing

## Scripts and Utilities

### Keystore Management (`shared-scripts/keystore.js`)
- Automatically generates RSA-2048 keys for JWT signing
- Persists keys in `.keystore.json` (added to `.gitignore`)
- Uses [node-jose](https://github.com/cisco/node-jose) library for cryptographic operations

## API Endpoints

All requests target the Orange Camara Playground:
```
Base URL: https://api.orange.com/camara/playground/api/
Auth URL: https://api.orange.com/openidconnect/playground/v1.0/
```

## Support

For API documentation and support:
- [Orange Developer Portal](https://developer.orange.com/)
- [Orange Network APIs Playground Documentation](https://docs.developer.orange.com/network-apis/practical-guides/try-it-for-free/overview)
- [CAMARA Project Documentation](https://camaraproject.org/)

## Notes

- This collection is designed for the **playground environment only**
- Production usage requires different endpoints and additional security considerations
- The `.keystore.json` file contains sensitive cryptographic keys - never commit it to version control