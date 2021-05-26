const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
    if (req.method === 'POST'){
        var db = router.db;
        var data = db.get('customerexpressresponses').find({ id: 1}).value();
        res.json(data);
    }else{
        next();
    }
});

server.use(jsonServer.rewriter({
    "/query-recharge": "/consultrequests",
    "/save-recharge":  "/consultrequests"
}))
server.use(router);
server.listen(5000, () => {
    console.log('JSON Server is running...')
});