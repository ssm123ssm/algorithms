var movie_id = [104257, 112384, 104257, 95953, 93779, 109830, 112384, 93779, 95953, 93779, 104257, 104257, 112384, 109830, 95953, 95953, 109830, 112384, 109830, 93779]
var people_id = [102, 102, 129, 129, 144, 158, 158, 1597, 163, 1697, 193, 197, 200, 398, 420, 596520, 641, 641, 705, 705]

var ex = 102
var wi = 705

$(function () {
    $("#cal").click(function () {
        if (people_id.includes(parseInt($("#ex").val())) && people_id.includes(parseInt($("#wi").val())) && parseInt($("#ex").val()) != parseInt($("#wi").val())) {
            ex = parseInt($("#ex").val());
            wi = parseInt($("#wi").val());
            find3([{
                id: ex
            }], wi, [])
            found_g = false;
        } else {
            alert('Invalid')
        }

    });
});

function findConnection(c) {
    var out = []
    for (var v = 0; v < c.length; v++) {
        var movie_list = [];
        for (var i = 0; i < people_id.length; i++) {
            if (people_id[i] == c[v].id) {
                movie_list.push(movie_id[i])
            }
        }
        for (var i = 0; i < movie_list.length; i++) {
            var movie = movie_list[i]
            for (var j = 0; j < movie_id.length; j++) {
                if (movie_id[j] == movie) {

                    if (people_id[j] != c[v].id) {
                        var exists = false;
                        for (var f = 0; f < out.length; f++) {
                            if (out[f].id == people_id[j]) {
                                exists = true;
                                break;
                            }
                        }
                        if (!exists) {
                            out.push({
                                id: people_id[j],
                                movie: movie_id[j],
                                thru: c[v].id
                            })
                        }
                    }

                }
            }
        }

    }
    return out;
}

var t = [];
var found_g = false;

function find3(x, y, t) {
    t.push(x);
    if (!found_g) {
        var it = findConnection(x)
        for (var i = 0; i < it.length; i++) {
            if (it[i].id == y) {
                console.log(`FOUND BETWEEN ${ex} and ${wi}  `)
                found_g = true;
                return (process(t, it[i]))
                break;
            }
        }
        if (!found_g) {
            find3(it, y, t)
        }
    }
}

function process(ar, i) {
    var cons = [];
    var output = ''
    var steps = ar.length - 1
    var seed = i;
    console.log((`connected by ` + (steps + 1) + ' degree(s)'))
    output = (`connected by ` + (steps + 1) + ' degree(s) <br><br>')
    cons.push(i);
    while (steps >= 0) {
        cons.push(fil(ar[steps], i))
        i = fil(ar[steps], i)
        steps--;
    }

    console.log(cons.reverse())


    for (var i = 1; i < cons.length; i++) {
        output += 'ID: ' + cons[i].id + '\n'
        output += 'featured in movie ' + cons[i].movie
        output += ' in which, the ID ' + cons[i].thru + ' aslo acted' + ' <br>'
    }

    $("#result").html(output)
    return (cons);

}

function fil(ar, i) {
    for (var j = 0; j < ar.length; j++) {
        if (ar[j].id == i.thru) {
            return (ar[j])
        }
    }
}
