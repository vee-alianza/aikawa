import { useEffect, useState } from 'react'
import ProductList from '../ProductListItem';
import './index.css'

const ProductView = ({ products }) => {
    const [sideOpen, setSideOpen] = useState(localStorage.getItem('sidePane') === 'true' || false);
    const [selected, setSelected] = useState();

    const setSidePanel = (flag) => {
        setSideOpen(flag);
        localStorage.setItem('sidePanel', flag);
    }

    const selectProduct = (e, item) => {
        setSelected(item);
    }

    useEffect(() => {
        // console.log(`selectedProduct${selected}`)
        if (selected) setSidePanel(true);
    }, [selected]);

    useEffect(() => {
        // console.log(`sideOpen ${sideOpen}`)
        if (!sideOpen) setSelected();
    }, [sideOpen]);

    return (
        <div className='product__view__container'>
            <div className='side__panel__info'>
                <h1>Products</h1>
                <div className='product__list'>
                    {products.map((item) => (
                        <ProductList
                            key={item.id}
                            product={item}
                            onClick={e => selectProduct(e, item)}
                        />
                    ))}
                </div>
            </div>
            <div className='side__panel'>
                <div className='side__panel__wrapper'>
                    <div className=''
                        onClick={(e) => setSidePanel(!sideOpen)}>
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails visible={sideOpen} product={selected} />
            </div>
        </div>
    );
}

export default ProductView;
