class RatingSorterApi {
    static async sorter(data, orderBy) {
        console.log("Get from compute");

        if (orderBy === 'POPULARITE') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => a.likes - b.likes)
                    };
                    resolve(result);

                }, 1000);
            });        
        } else if (orderBy === 'DATE') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => b.date - a.date)
                    };

                    resolve(result);
                }, 1000);
            });
        } else if (orderBy === 'TITRE') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => (a.attr > b.attr) - (a.attr < b.attr))
                    };

                    resolve(result);
                }, 1000);
            });
        } else {
            throw new Error('unknow orderBy type');
        }
    }
}
