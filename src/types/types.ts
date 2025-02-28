/**
 * Options for the useFetch hook.
 * @property save - Enables caching when set to true.
 * @property savingMethod - Chooses the save storage. Options:
 *    - 'session': Uses sessionStorage.
 *    - 'local': Uses localStorage.
 *    - 'cache': Uses Cache Storage.
 * Default savingMethod is 'cache'.
 */
export interface UseFetchOptions {
	save?: boolean;
	savingMethod?: 'session' | 'local' | 'cache';
}
