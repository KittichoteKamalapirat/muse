import "reflect-metadata";
import { startServer } from "./startSever";

startServer(); // so it doesn't start 2 times in test one when import, one when called
