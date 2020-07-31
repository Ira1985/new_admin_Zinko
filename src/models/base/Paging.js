export default class Paging {
    page=1;
    limit=20;
    count=0;
    totalPages=1;

    build(item){
        this.page = item['page']?item['page']:1;
        this.limit = (item['limit']?item['limit']:20);
        this.count = (item['count']?item['count']:0);
        this.totalPages = (item['totalPages']?item['totalPages']:1);
        return this;
    }

    buildWithPage(item, page){
        let p = this.build(item);
        p.setPage(page);
        return p;
    }

    buildWithLimit(item, limit){
        let p = this.build(item);
        p.setLimit(limit);
        return p;
    }

    setPage(page){
        this.page = page;
    }

    setLimit(limit){
        this.limit = limit;
    }

    setCount(count){
        this.count = count;
    }
    setTotalPages(totalPages){
        this.totalPages = totalPages;
    }
}
