import * as shell from "shelljs";

shell.cp("-R", "src/schema/*.gql", "dist/schema");