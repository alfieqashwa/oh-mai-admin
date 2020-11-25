export const UPLOADS3 = `mutation uploadS3($files: [Upload]!, $slug:String){
    multipleUploadS3(files:$files, slug:$slug){
            location
        } 
    }
`;
