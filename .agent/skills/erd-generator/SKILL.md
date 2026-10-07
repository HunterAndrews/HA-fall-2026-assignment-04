---
title: erd-generator
date: 10/7/26
author: Hunter Andrews
description: This skill generates an entity-relationship diagram (ERD) from a Mermaid file.

# Execution Workflow

1. Parse domain requirements into entities, primary keys (PK), foreign keys (FK), and cardinalities.
   - Entities: Tables, Views, and Materialized Views
   - PK: Primary Key
   - FK: Foreign Key
   - Cardinality: One-to-One, One-to-Many, Many-to-One, Many-to-Many
2. Write the drafted Mermaid syntax directly to docs/architecture/schema.mmd.
   - Use the following syntax to create a Mermaid block:
     ```
     ```mermaid
     <Mermaid Syntax>
     ```
3. Execute node scripts/render_erd.js docs/architecture/schema.mmd.
   - This script compiles the Mermaid syntax to an SVG file and prints SUCCESS. The renderer reads docs/architecture schema.mmd and generates docs/architecture/erd.svg. A successful execution prints SUCCESS, A failed execution prints SYNTAX_ERROR.
4. Self-Correction Loop: If execution fails with SYNTAX_ERROR, parse the error trace, adjust the Mermaid syntax in docs/architecture/schema.mmd, and re-run (up to 3 retries).
   - If the Mermaid syntax is still invalid after 3 retries, return an error message to the user.
5. Final Output: Present the raw Mermaid block to the user and reference the generated image asset path (docs/architecture/erd.svg).
   - The user can then copy and paste the image into their own documentation.

## Skill Name

erd-generator

## Skill Description

This skill generates an entity-relationship diagram (ERD) from a Mermaid file.

## Skill Input

The skill takes a Mermaid file as input.

## Skill Output

The skill outputs an entity-relationship diagram (ERD) as an SVG file.