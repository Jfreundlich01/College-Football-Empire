echo "Stopping neo4j"
docker ps -q --filter ancestor="neo4j:latest" | xargs -r docker stop
echo "neo4j Stopped"

echo "Cleaning up all stopped containers."
docker container prune -f

echo "Stop complete."
