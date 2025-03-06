export function convertGmailAppMessageToPlainObject(
  message: GoogleAppsScript.Gmail.GmailMessage
): {
  message: string;
  date: string;
  subject: string;
  from: string;
  labels?: string[];
} {
  const labels = getGmailUserLabels();
  return {
    message: message.getPlainBody(),
    date: message.getDate().toISOString(),
    subject: message.getSubject(),
    from: message.getFrom(),
    labels: (Gmail?.Users?.Messages?.get("me", message.getId())?.labelIds ?? [])
      .map((labelId) => labels.find((label) => label.id === labelId)?.name)
      .filter(Boolean) as string[],
  };
}

export function convertGmailAppThreadToPlainObject(
  thread: GoogleAppsScript.Gmail.GmailThread
) {
  return thread.getMessages().map(convertGmailAppMessageToPlainObject);
}

export function serializeGmailAppThread(
  thread: GoogleAppsScript.Gmail.GmailThread
) {
  return JSON.stringify(convertGmailAppThreadToPlainObject(thread));
}


export function _getGmailUserLabels(): GoogleAppsScript.Gmail.Schema.Label[] {
  return (Gmail?.Users?.Labels?.list("me")?.labels ?? []).filter(Boolean);
}

export const getGmailUserLabels = memoize(_getGmailUserLabels, 10);

export function createGmailUserLabelIfNotExists(labelName: string): GoogleAppsScript.Gmail.Schema.Label {
  if (labelName.includes("/")) {
    const parent = labelName.split("/").slice(0, -1).join("/");
    createGmailUserLabelIfNotExists(parent);
  }

  const labels = getGmailUserLabels();
  const label = labels.find(
    (label) =>
      label.name &&
      label.name.trim().toLowerCase() === labelName.trim().toLowerCase()
  );

  if (!label) {
    return Gmail?.Users?.Labels?.create(
      {
        name: labelName,
      },
      "me"
    ) as GoogleAppsScript.Gmail.Schema.Label;
  }

  return label;
}

/**
 * A generic hash function that takes a string and computes a hash using the
 * specified algorithm.
 *
 * @param {string} str - The string to hash.
 * @param {Utilities.DigestAlgorithm} algorithm - The algorithm to use to
 *  compute the hash. Defaults to MD5.
 * @returns {string} The base64 encoded hash of the string.
 */
function hash(str: string, algorithm = Utilities.DigestAlgorithm.MD5) {
  const digest = Utilities.computeDigest(algorithm, str);
  return Utilities.base64Encode(digest);
}

/**
 * Memoizes a function by caching its results based on the arguments passed.
 *
 * @param {Function} func - The function to be memoized.
 * @param {number} [ttl=600] - The time to live in seconds for the cached
 *  result. The maximum value is 600.
 * @param {Cache} [cache=CacheService.getScriptCache()] - The cache to store the
 *  memoized results.
 * @returns {Function} - The memoized function.
 *
 * @example
 *
 * const cached = memoize(myFunction);
 * cached(1, 2, 3); // The result will be cached
 * cached(1, 2, 3); // The cached result will be returned
 * cached(4, 5, 6); // A new result will be calculated and cached
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  ttl = 600,
  cache = CacheService.getScriptCache()
): (...args: any[]) => ReturnType<T> {
  return (...args: any[]) => {
    // consider a more robust input to the hash function to handler complex
    // types such as functions, dates, and regex
    const key = hash(JSON.stringify([func.toString(), ...args]));
    const cached = cache.get(key);
    if (cached != null) {
      return JSON.parse(cached);
    } else {
      const result = func(...args);
      cache.put(key, JSON.stringify(result), ttl);
      return result;
    }
  };
}
