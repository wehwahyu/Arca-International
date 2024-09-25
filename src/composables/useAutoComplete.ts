interface AutoCompleteProps {
  data: any
  fetchData: (queryString: string) => Promise<void>
}

interface AutoCompleteReturn {
  querySearch: (queryString: string, cb: any) => void
  createFilter: (queryString: string) => void
}

export function useAutoComplete({ data, fetchData }: AutoCompleteProps): AutoCompleteReturn {
  const querySearch = async (queryString: string, cb: any) => {
    await fetchData(queryString)
    const results = queryString
      ? data.value.filter(createFilter(queryString))
      : data.value
    // call callback function to return suggestions
    if (typeof cb !== 'string') cb(results)
  }

  const createFilter = (queryString: string) => {
    return (item: any) => {
      return (
        item.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }

  return {
    querySearch,
    createFilter,
  }
}
