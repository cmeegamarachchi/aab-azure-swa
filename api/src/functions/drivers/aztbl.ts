// get list of entities from Azure Table Storage
import { TableClient, odata } from "@azure/data-tables";

const connectionString = process.env.AZURE_STORAGE_ACCOUNT_CONNECTION_STRING;

export interface TableEntity {
  partitionKey: string;
  rowKey: string;
  id: string;
}

function getTableClient(tableName: string): TableClient {
  if (!connectionString) {
    throw new Error("Azure Storage connection string must be set in environment variables.");
  }

  return TableClient.fromConnectionString(connectionString, tableName);
}

export async function getEntity<T extends TableEntity>(
  tableName: string,
  partitionKey: string,
  id: string
): Promise<T | null> {
  try {
    const tableClient = getTableClient(tableName);
    const entity = tableClient.getEntity<T>(partitionKey, id);
    return entity;
  } catch (err) {
    throw err;
  }
}

export async function addEntity<T extends TableEntity>(tableName: string, entity: T): Promise<T> {
  try {
    const tableClient = getTableClient(tableName);
    await tableClient.createEntity(entity);
    return entity;
  } catch (err) {
    throw err;
  }
}

export async function updateEntity<T extends TableEntity>(tableName: string, entity: T): Promise<T> {
  try {
    const tableClient = getTableClient(tableName);
    await tableClient.updateEntity(entity, "Merge");
    return entity;
  } catch (err) {
    throw err;
  }
}

export async function deleteEntity(tableName: string, partitionKey: string, id: string): Promise<void> {
  try {
    const tableClient = getTableClient(tableName);
    await tableClient.deleteEntity(partitionKey, id);
  } catch (err) {
    throw err;
  }
}

export async function listEntities<T extends TableEntity>(tableName: string, partitionKey: string): Promise<T[]> {
  try {
    const tableClient = getTableClient(tableName);
    const entities = tableClient.listEntities<T>({
      queryOptions: { filter: odata`PartitionKey eq '${partitionKey}'` },
    });
    const results: T[] = [];
    for await (const entity of entities) {
      results.push(entity);
    }
    return results;
  } catch (err) {
    throw err;
  }
}
