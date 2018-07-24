node {
docker.withRegistry('https://registry.hub.docker.com/', 'dockerhub' ) {  

        git url: "https://github.com/Mocoso1705/twitter", credentialsId: 'github'

        sh "git rev-parse HEAD > .git/commit-id"
        def commit_id = readFile('.git/commit-id').trim()
        println commit_id

        stage "build"
        if (${params.DEPLOY_ENV}" == 'rollback') {
                                                    echo 'Nothing to do if rolling back'
                                            } else {
                                                    echo 'Building image'
                                                    def app = docker.build "mocoso/tuiter"

                                            }
    
        stage "publish"
        if (${params.DEPLOY_ENV}" == 'rollback') {
                                                    echo 'Nothing to do if rolling back'
                                            } else {
                                                    echo 'Pushing Image to Dockerhub'
						        app.push 'master'
						        app.push "${commit_id}"
						        println "${commit_id}"

                                            }
 stage "deploy"
        if (${params.DEPLOY_ENV}" == 'rollback') {
            "Staring rolling back of previous deployment"
             sh '''     
             export KUBECONFIG=~/.kube/kubeconfig-eks
             echo "$KUBECONFIG"
             kubectl rollout undo deployment/nginx-deployment
             '''
             }
        else { 
        sh '''
        echo "Startig Deployment to Kubernetes"
        COMMIT=$(git rev-parse HEAD)
        export KUBECONFIG=~/.kube/kubeconfig-eks
        echo "$KUBECONFIG"
        kubectl cluster-info
        kubectl set image deployment/tuiter-deployment tuiter=mocoso/tuiter:$COMMIT
        '''

    }
}
}
