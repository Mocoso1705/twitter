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
        sh '''echo "hello"
        env
        echo "${commit_id}" '''

    }
}
