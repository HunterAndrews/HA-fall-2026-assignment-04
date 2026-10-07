---
name: kysely-migration-generator
description: This skill consumes a Mermaid ERD and translates it into a type safe Kysely migration database. It is triggered when the user requests a Kysely migration.
---

# Mapping Guardrails

1. Entities → Tables: Map every Mermaid entity to a database table. Convert entity names to snake_case and use lowercase table names.
2. Keys & Columns: Attributes marked PK must become primary keys and auto generate to IDs/UUIDs. Attributes marked FK must become foreign-key references to the corresponding primary-key column. FK attributes are converted to .references().onDelete('cascade').
3. Cardinalities: Use Mermaid relationship cardinalities to determine database constraints. Example: 1-M: ||--o{, 1-1: ||--o|
4. File Output: Write the generated TypeScript migration to: src/db/migrations/<timestamp>_<migration_name>.ts
5. Structure: The up function (up(db: Kysely<any>)) must create tables in dependency order so that referenced tables exist before foreign keys are created. The down function (down(db: Kysely<any>)) must drop tables in reverse dependency order, ensuring dependent tables are dropped before the tables they reference. Each are exports should be enforced.

## Skill Name

kysely-migration-generator

## Skill Description

This skill consumes a Mermaid ERD and translates it into a type safe Kysely migration database.

## Skill Input

The skill takes a Mermaid file as input.

## Skill Output

The skill outputs a TypeScript migration file.