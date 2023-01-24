//import { DIDDocument } from "@digitalcredentials/sign-and-verify-core";
import ConfigurationError from "./errors.js";

let CONFIG = null;

function setConfig() {
  CONFIG = parseConfig();
}

function parseConfig() {
  if (!process.env.PORT) {
    throw new ConfigurationError("Environment variable 'PORT' is not set");
  }
  return Object.freeze({
    host: process.env.HOST,
    port: parseInt(process.env.PORT),
    protocol: process.env.PROTOCOL,
    lcpHost: process.env.LCP_HOST,
    lcpPort: parseInt(process.env.LCP_PORT),
    lcpProtocol: process.env.LCP_PROTOCOL
  });
}

export function resetConfig() {
  CONFIG = null;
}

export function getConfig() {
  if (!CONFIG) {
    setConfig()
  }
  return CONFIG;
}

