
import './index.css'

const ProductsPage = ({ products }) => {
    const productArray = new Array(30).fill({
        id: 2,
        title: 'title',
        description: 'description',
        price: 123.45,
        image: 'https://1fm5ponuc3s3s8eo12ml9f5x-wpengine.netdna-ssl.com/wp-content/uploads/2018/04/web-EllipseBench_angle-1600x1133.jpg',
        quantity: 5
    });
    console.log(productArray)


    return (
        <>
            <h3>Product Page</h3>
            <div className='products__container'>
                <div className='product-details__container'>
                    {/* <p>
                        top seller
                    </p> */}
                    {productArray.map((product) => (
                        <div className='product__image__container'>
                            <img className='product__image' src={product.image}></img>
                            <div className='product__image__overlay'>
                                <img className='product__image' src={product.image}></img>
                            </div>
                            <h3>{product.title}</h3>
                            <p>{product.price}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default ProductsPage;
