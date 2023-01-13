class RatingSorterApi {
    static async sorter(data, orderBy) {
        console.log("Get from compute")

        if (orderBy === 'ASC') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => a.date - b.date)

                        key: orderBy,
                        data: Array.from(data).sort((a, b) => a.likes - b.likes)

                        // titre
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => (a.attr > b.attr) - (a.attr < b.attr))
                    }

                    resolve(result)

                }, 1000)
            })
        } else if (orderBy === 'DESC') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => b.date - a.date)
                    }

                    resolve(result)
                }, 1000)
            });
        } else {
            throw new Error('unknow orderBy type');
        }
    }
}
