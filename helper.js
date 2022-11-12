// document.getElementById("displaytext").style.display = "none";

function searchPhoto() {

    var apigClient = apigClientFactory.newClient();

    var user_message = document.getElementById('input-search').value;

    var body = {};
    var params = {q : user_message};
    var additionalParams = {};
    console.log("userMassage:",user_message)

    apigClient.searchGet(params, body, additionalParams).then(function (res) {
        var data = {}
        var data_array = []
        console.log("res:",res);
        resp_data = res.data
        console.log("res_data",resp_data);
        length_of_response = resp_data.length;
        if (length_of_response == 0) {
            document.getElementById("displaytext").innerHTML = "No Images Found !!!"
            document.getElementById("displaytext").style.display = "block";
        }

        resp_data.forEach(function (obj) {

            var img = new Image();
            img.src = obj;
            img.setAttribute("class", "banner-img");
            img.setAttribute("alt", "effy");
            document.getElementById("displaytext").innerHTML = "Images returned are : "
            document.getElementById("img-container").appendChild(img);
            document.getElementById("displaytext").style.display = "block";

        });
    }).catch(function (result) {

    });



}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        // reader.onload = () => resolve(reader.result)
        reader.onload = () => {
            let encoded = reader.result.replace(/^data:(.*;base64,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}



function uploadPhoto() {
    // var file_data = $("#file_path").prop("files")[0];
    var file = document.getElementById('file_path').files[0];
    const reader = new FileReader();
    // var encoded_image = getBase64(file);
    // console.log(encoded_image);

    var file_data;
    // var file = document.querySelector('#file_path > input[type="file"]').files[0];
    // var encoded_image = getBase64(file).then(
    //     data => {
    //         // console.log(data)
    //         var apigClient = apigClientFactory.newClient({
    //             apiKey: "YsDgY16Jd175fw9T9Ac4N3rrn2lGbI7u2Yp5hR5a"
    //         });
    //         console.log("API KEY")
    //         // var data = document.getElementById('file_path').value;
    //         // var x = data.split("\\")
    //         // var filename = x[x.length-1]
    //         var file_type = file.type + ";base64"

    //         var body = data;
    //         var params = {
    //             "filename": file.name,
    //             "bucket": "hx2163-nyu-cloud-photo-b2",
    //             "Content-Type": file.type,
    //             "Access-Control-Allow-Origin": "*",
    //             "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    //             "Access-Control-Allow-Methods": "OPTIONS, PUT"
    //         };
    //         var additionalParams = {
    //             headers: {
    //                 "Access-Control-Allow-Origin": "*",
    //                 "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
    //                 "Access-Control-Allow-Methods": "OPTIONS, PUT"
    //             }
    //         };
    //         apigClient.bucketFilenamePut(params, body, additionalParams).then(function (res) {
    //             if (res.status == 200) {
    //                 document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!"
    //                 document.getElementById("uploadText").style.display = "block";
    //             }
    //         })
    //     });

    // var enc_name = CryptoJS.HmacSHA256(file_data, Date.now().toString()) + '.jpg'
    var upload_url = "https://k450okfyzc.execute-api.us-east-1.amazonaws.com/v1/upload/nyu-22fall-csgy9223-assignment2-yp2212-b2/"
    fetch(upload_url + file.name, {
        method: 'PUT', headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            "Access-Control-Allow-Methods": "OPTIONS, PUT",
            "Content-Type" : file.type,
        }, body: file
    }).then(function(res){
        if (res.status == 200) {
            document.getElementById("uploadText").innerHTML = "Image Uploaded  !!!"
            document.getElementById("uploadText").style.display = "block";
        }
    })

}