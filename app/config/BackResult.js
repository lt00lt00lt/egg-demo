'use strict';

module.exports = {
    backResult(state, data, msg, count) {
        return { state: state, data: data, msg: msg, count: count }
    },
}