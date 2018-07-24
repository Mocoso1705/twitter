node {
docker.withRegistry('https://registry.hub.docker.com/', 'dockerhub' ) {  

        git url: "https://github.com/Mocoso1705/twitter", credentialsId: 'github'

        sh "git rev-parse HEAD > .git/commit-id"
        def commit_id = readFile('.git/commit-id').trim()
        println commit_id

        stage "build"
        def app = docker.build "mocoso/tuiter"
    
        stage "publish"
        app.push 'master'
        app.push "${commit_id}"
        println "${commit_id}"
        stage "deploy"
    
# I know this sucks :)

        if (env.PIPELINE_ACTION == 'rollback') {
            sh '''
              APP="tuiter"
              APP_DEPLOYMENT="deployment/$APP-deployment 
              export KUBECONFIG=~/.kube/kubeconfig-eks >> enviroment
              echo "Starting rollback" 
              kubectl rollout undo $APP_DEPLOYMENT
             '''
        } else {
        sh '''
        export KUBECONFIG=~/.kube/kubeconfig-eks >> enviroment
        APP="tuiter"
        APP_DEPLOYMENT="deployment/$APP-deployment
        DOCKERUSR="mocoso" 
        COMMIT=$(git rev-parse HEAD) 
        echo "Startig Deployment to Kubernetes"
        kubectl set image $APP_DEPLOYMENT $APP=$DOCKERUSR/$APP:$COMMIT            
        '''
        }


    }
}
