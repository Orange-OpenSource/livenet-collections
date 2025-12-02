# Orange Network APIs Collections

A comprehensive repository of API collections for testing and integrating with Orange's network APIs across different environments and tools.

## Overview

This repository provides ready-to-use API collections for Orange's implementation of various network APIs, including [CAMARA Project](https://camaraproject.org/) APIs. 
Each collection is designed to work with popular API testing tools and environments.

## Repository Structure

```
├── playground/          # Orange Network APIs Playground collections
│   ├── bruno/           # Bruno API client collection
│       └── README.md    # Playground-specific documentation
└── README.md            # This file
```

## Available Collections

### Playground Environment

**Location**: [`playground/`](./playground/)

Test Orange's Camara Network APIs in a sandbox environment without requiring an actual network connection.

**Available Tools**:
- **Bruno** ([`playground/bruno/`](./playground/bruno/)) - Complete collection with authentication flows and all API endpoints

**Features**:
- Multiple OAuth 2.0 flows (Client Credentials, Authorization Code, CIBA)
- Automatic token management
- Pre-configured test data
- JWT client assertion generation

**[View Playground Documentation](./playground/bruno/README.md)**

## Getting Started

### Prerequisites

- An API testing tool (Bruno, Postman, Hurl, etc.)
- Node.js (for collections with scripts)
- Orange API credentials from [Orange Developer Portal](https://developer.orange.com/)

### Installation

1. **Clone the repository**:
```bash
git clone https://github.com/Orange-OpenSource/livenet-collections.git
cd livenet-collections
```

2. **Navigate to your desired collection**:
```bash
# For Playground Bruno collection
cd playground/bruno
```

3. **Follow the specific collection's README** for detailed setup instructions

## Supported API Testing Tools

| Tool | Status | Collections Available |
|------|--------|-----------------------|
| [Bruno](https://www.usebruno.com/) | ✅ Available | Playground |
| [Hurl](https://hurl.dev/) | 🔄 Planned | - |
| [IntelliJ HTTP Client](https://www.jetbrains.com/help/idea/http-client-in-product-code-editor.html) | 🔄 Planned | - |
| [Postman](https://www.postman.com/) | 🔄 Planned | - |
| [Insomnia](https://insomnia.rest/) | 🔄 Planned | - |

## Documentation

- **[Orange Network APIs Documentation](https://docs.developer.orange.com/network-apis)** - Complete API reference
- **[Playground Guide](https://docs.developer.orange.com/network-apis/practical-guides/try-it-for-free/overview)** - Getting started with the playground
- **[CAMARA Project](https://camaraproject.org/)** - Open source project specifications

## Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/amazing-feature`)
3. **Add or improve collections** for new tools or environments
4. **Test your changes** thoroughly
5. **Commit your changes** (`git commit -m 'Add amazing feature'`)
6. **Push to the branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

### Contribution Guidelines

- Follow existing folder structure for consistency
- Include comprehensive README.md for new collections
- Test collections before submitting
- Update this main README when adding new collections

## Roadmap

- [ ] Hurl collections for Playground  
- [ ] IntelliJ HTTP Client collections for Playground  
- [ ] Postman collections for Playground  
- [ ] Insomnia collections for Playground  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- **Issues**: [GitHub Issues](https://github.com/Orange-OpenSource/livenet-collections/issues)
- **API Support**: [Orange Developer Portal](https://developer.orange.com/)
- **Documentation**: [Orange Network APIs](https://docs.developer.orange.com/network-apis)

## Acknowledgments

- [CAMARA Project](https://camaraproject.org/) for the open API specifications
- Orange Developer Community for feedback and contributions
- API testing tool communities for their excellent platforms

---

**Note**: These collections are designed for testing and development purposes. Production usage may require different configurations and additional security considerations.