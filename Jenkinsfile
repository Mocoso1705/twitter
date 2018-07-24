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
        sh '''
                APP="tuiter" > enviroment
                DOCKERUSR="mocoso" >> enviroment
                APP_DEPLOYMENT="deployment/$APP-deployment" >> enviroment
                export KUBECONFIG=~/.kube/kubeconfig-eks >> enviroment
                COMMIT=$(git rev-parse HEAD) >> enviroment
             '''
    

        if (env.PIPELINE_ACTION == 'rollback') {
            sh '''
               . enviroment
               echo "Starting rollback" 
              kubectl rollout undo $APP_DEPLOYMENT
             '''
        } else {
        sh '''
        . enviroment
        echo "Startig Deployment to Kubernetes"
        kubectl set image $APP_DEPLOYMENT $APP=$DOCKERUSR/$APP:$COMMIT            
        '''
        }


    }
}
