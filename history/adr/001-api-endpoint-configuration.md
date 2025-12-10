# ADR 001: API Endpoint Configuration for Backend-Frontend Communication

## Status
Accepted

## Date
2025-12-10

## Context
The frontend Docusaurus application needs to communicate with the backend FastAPI server for chatbot functionality. The applications run on different ports (frontend on 3000, backend on 8000), requiring proper API endpoint configuration to enable communication.

## Decision
We decided to implement a centralized API configuration file that:
1. Exposes configurable API endpoints through a dedicated config module
2. Supports environment-based URL configuration via environment variables
3. Provides fallback URLs for development environments
4. Uses consistent endpoint patterns across the application

## Consequences
Positive:
- Enables flexible deployment across different environments
- Centralizes API endpoint management in one location
- Reduces hardcoded URLs throughout the codebase
- Allows easy switching between development, staging, and production APIs

Negative:
- Adds an additional configuration layer
- Requires environment variables to be set in deployment environments

## Alternatives
1. Hardcoded URLs in each component (rejected - inflexible, hard to maintain)
2. Proxy configuration in Docusaurus (rejected - requires additional setup, more complex)
3. Dynamic configuration via build-time variables (rejected - less flexible than runtime configuration)

## References
- src/config/api.js
- src/components/Chatbot.js