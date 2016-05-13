var ft;

var fileTransfer = {
    startUpload: function(fileUrl){

        var uploadServer = 'http://up.qiniu.com/';

        //Upload progress
        var text = '<div id="progress" class="progress"><span class="progress-bar"></span></div>';
        weApp.modal({
            title: '正在上传图片... <span class="percent"></span>',
            text: text,
            buttons: [{
                text: "取消",
                onClick: fileTransfer.abortUpload
            }]
        });

        /* global FileUploadOptions */
        var options = new FileUploadOptions();
        options.fileKey = 'upfile';
        options.fileName = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
        options.mimeType = 'image/jpeg';
        options.params = {};
        ft = new FileTransfer();
        ft.upload(fileUrl, encodeURI(uploadServer), fileTransfer.uploadSuccess , fileTransfer.uploadFail , options);

        ft.onprogress = fileTransfer.onprogress;
    },

    uploadSuccess: function (r) {
        weApp.closeModal('.modal');

        navigator.camera.cleanup();

        var response = r.response ? JSON.parse(r.response) : '';

        weApp.alert(response);
    },

    uploadFail: function (error) {
        weApp.closeModal('.modal');

        /* global FileTransferError */
        var errText;
        switch (error.code){
            case FileTransferError.FILE_NOT_FOUND_ERR:
                errText = "未找到需要上传的文件";
                break;
            case FileTransferError.INVALID_URL_ERR:
                errText = "无效的上传服务器指向";
                break;
            case FileTransferError.CONNECTION_ERR:
                errText = "与网络断开或请求超时";
                break;
            case FileTransferError.ABORT_ERR:
                errText = "已经取消图片的上传";
                break;
            case FileTransferError.NOT_MODIFIED_ERR:
                errText = "没有修改";
                break;
        }

        weApp.alert(errText);
    },

    onprogress: function(progressEvent){
        if (progressEvent.lengthComputable) {
            var percent = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            $$('#progress').parents('.modal-inner').find('.modal-title .percent').html(percent + '%');
            $$('#progress').find('.progress-bar').css('width',percent + '%');
        }
    },

    abortUpload: function(){
        ft.abort();
    }
};

module.exports = fileTransfer;