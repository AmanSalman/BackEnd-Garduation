
import authRouter from './modules/auth/auth.router.js';
import bookRouter from './modules/book/book.router.js';
import cartRouter from './modules/cart/cart.router.js';
import categoryRouter from './modules/category/category.router.js';
import orderRouter from './modules/order/order.router.js';
import reviewRouter from './modules/review/review.router.js';
import userRouter from './modules/user/user.router.js';
import couponRouter from './modules/coupon/coupon.router.js';
import wishListRouter from './modules/wishlist/wishlist.router.js'
import cors from 'cors'
export const Appinit = ( app,express )=>{
    app.use(express.json());
    const allowedOrigins = ["http://localhost:5173","http://localhost:5174", "https://admindashboard-8bwy.onrender.com"];
    app.use(cors({
      origin: (origin, callback) => {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
          } else {
            callback(new Error('Not allowed by CORS'));
          }
      },
      methods: 'GET,POST,PUT,DELETE,HEAD,PATCH',
      allowedHeaders: 'Content-Type, Authorization',
      credentials: true, // Set to true if you're passing cookies or authorization headers
      preflightContinue: false
      
    }));
    app.get('/', (req,res)=>{
        return res.status(200).json({message:"Welcome"})
     })
    app.use('/auth', authRouter);
    app.use('/user', userRouter)
    app.use('/book', bookRouter);
    app.use('/cart', cartRouter);
    app.use('/wishlist', wishListRouter );
    app.use('/category', categoryRouter);
    app.use('/order', orderRouter);
    app.use('/review', reviewRouter);
    app.use('/coupon', couponRouter);

    app.get('*', (req,res)=>{
        return res.status(404).json({message:"page not found"})
     })


     app.use((err,req,res,next)=>{
      res.status(err.statusCode).json({message:err.message})
     })
}