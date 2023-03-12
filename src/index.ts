import express from 'express';
import roomRoute from './routes/room.route';
import sourceRoute from './routes/source.route';
import productRoute from './routes/product.route';
import productItemRoute from './routes/productItem.route';
import transactionRoute from './routes/transaction.route';
import userRoute from './routes/user.route';

const app = express();

app.use(express.json());

app.use('/lab', roomRoute);
app.use('/source', sourceRoute);
app.use('/products', productRoute);
app.use('/productItem', productItemRoute);
app.use('/transaction', transactionRoute);
app.use('/user', userRoute);

app.listen(3000, () =>
  console.log('REST API server ready at: http://localhost:3000'),
);
