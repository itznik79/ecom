# E-Commerce Microservices Platform

A production-grade, microservices-based e-commerce backend built with **NestJS**, **PostgreSQL**, **Docker**, and **RBAC authorization**. Designed following clean service boundaries, DDD (Domain-Driven Design) principles, modularity, and enterprise security patterns.

## Overview

This project aims to build a scalable, secure, and extensible backend for modern e-commerce applications using a microservices architecture. The system separates **authentication**, **user domain**, and **API gateway**, enabling independent scaling, deployment, and future feature expansion.

This platform is suitable for learning real-world architecture, building production services, and extending into a full e-commerce ecosystem (catalog, orders, payments, inventory, etc).


## Features

- **Microservices architecture**
- **NestJS backend**
- **Docker containerization**
- **PostgreSQL databases**
- **JWT-based authentication**
- **Refresh token rotation**
- **Role-based access control (RBAC)**
- **OAuth-ready**
- **API Gateway abstraction**
- **Scalable + maintainable domain separation**
- **Production-ready folder structure**
- **Developer-friendly onboarding**


## Service Architecture

```mermaid
flowchart LR
    Client((Frontend))
    Client --> Gateway(API Gateway)
    
    subgraph Auth_Service [Auth Service]
        ADB[(auth_db)]
        Auth
    end
    
    subgraph User_Service [User Service]
        UDB[(user_db)]
        User
    end
    
    Gateway --> Auth
    Gateway --> User
    
    Auth --> ADB
    User --> UDB
