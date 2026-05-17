// validates that the sort option is one of the allowed values

export function isValidSortOption(option: string): option is 'az' | 'za' | 'lohi' | 'hilo' {
    return ['az', 'za', 'lohi', 'hilo'].includes(option);
}