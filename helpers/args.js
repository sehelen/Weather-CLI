export const getArgs = (data) => {
    const args = {};
    const filteredData = data.slice(2);
    filteredData.forEach((item, i) => {
        switch (item) {
            case '-s':
                args['s'] = filteredData[i + 1];
                return;
            case '-h':    
                args['h'] = true;
                return;
            case '-t':    
                args['t'] = filteredData[i + 1];
                return;
            default:
                return;
        }
    });
    return args;
}