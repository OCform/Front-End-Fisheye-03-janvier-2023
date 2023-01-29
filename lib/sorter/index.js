class RatingSorterApi {
    static async sorter(data, orderBy) {
        console.log('Order by ', orderBy);       
        if (orderBy === 'POPULARITY') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => b.likes - a.likes)
                    };

                    resolve(result);                    
                }, 1000);
            });        
        } else if (orderBy === 'DATE') {
            return new Promise((resolve) => {
                setTimeout(() => {                    
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a,b) => new Date(b.date) - new Date(a.date))                        
                    };
                    
                    resolve(result);
                }, 1000);
            });
        } else if (orderBy === 'TITLE') {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const result = {
                        key: orderBy,
                        data: Array.from(data).sort((a, b) => (a.title > b.title) - (a.title < b.title))
                    };

                    resolve(result);
                }, 1000);
            });
        } else {
            throw new Error('unknow orderBy type');
        }
    }
}
