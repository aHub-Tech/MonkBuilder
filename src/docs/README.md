# MonkBuilder Documentation

MonkBuilder is a TypeScript library designed for building MongoDB queries in an ORM-like fashion.

## Project Structure

The project is organized into several directories to maintain a clean and modular codebase:

- **`src/`**: Contains the source code of MonkBuilder.
  - **`builder/`**: Houses classes responsible for building MongoDB queries.
    - `QueryBuilder.ts`: Implements the main query builder class.
    - ... (Other builder classes)
  - **`models/`**: Defines data models representing the structure of MongoDB queries.
    - `QueryModel.ts`: Example model class.
    - ... (Other model classes)
  - **`utils/`**: Holds utility classes or functions used across the project.
    - `Validator.ts`: Implements input parameter validation.
    - ... (Other utility classes)
  - `index.ts`: The entry point of the library.

- **`tests/`**: Contains unit tests for the library.

- **`docs/`**: The documentation directory.
  - `ProjectStructure.md`: Overview of the project structure.
  - ... (Other documentation files)

- **`tsconfig.json`**: Configuration file for TypeScript.

- **`package.json`**: Configuration file for NPM.

## QueryBuilder Class

The `QueryBuilder` class, located in `src/builder/QueryBuilder.ts`, is the central component for constructing MongoDB queries. It provides an ORM-like interface to facilitate the creation of complex queries.

### Example Usage

```typescript
import { QueryBuilder } from 'monk-builder';

// Create an instance of QueryBuilder
const queryBuilder = new QueryBuilder();

// Build a MongoDB query


const query = queryBuilder
  .select('name', 'age')
  .from('users')
  .where('age').gt(25)
  .build();

console.log(query);
```
