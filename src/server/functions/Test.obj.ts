export default class TestObj {
    public test() {
        return Response.json({
            msg: 'test',
            code: 200,
        })
    }
}