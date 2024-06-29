Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

cd backend
mvn spring-boot:run

cd ../frontend
npm run start