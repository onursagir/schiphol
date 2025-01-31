import data from "./data.json";

export type Flight = (typeof data)["flights"][number];
