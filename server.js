import express from "express";
import morgan from "morgan";

import { makeSQLConnection, makeSQLDatabase } from "./utils/mysql.js";
import { makeMongoDatabase } from "./utils/mongodb.js";
