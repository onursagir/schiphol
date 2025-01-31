import data from "./data.json";

export type Sort = "asc" | "desc";

export type Flight = (typeof data)["flights"][number];
