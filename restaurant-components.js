// components/Home.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [currentPromotion, setCurrentPromotion] = useState('');

  useEffect(() => {
    const updatePromotion = () => {
      const today = new Date().getDay();
      const promotions = {
        1: "Segunda-feira: 10% de desconto em pratos vegetarianos!",
        2: "Terça-feira: Sobremesa grátis no almoço!",
        3: "Quarta-feira: 15% de desconto em vinhos!",
        4: "Quinta-feira: 2 por 1 em entradas!",
        5: "Sexta-feira: Happy hour especial!",
        6: "Sábado: Menu degustação com preço especial!",
        0: "Domingo: Almoço em família com sobremesa grátis!"
      };
      setCurrentPromotion(promotions[today]);
    };

    updatePromotion();
    const interval = setInterval(updatePromotion, 86400000); // Atualiza diariamente
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <h1>Bem-vindo ao nosso Restaurante</h1>
        <p>Uma experiência gastronômica única em um ambiente acolhedor</p>
        <Link to="/menu" className="cta-button">Ver Menu</Link>
      </section>

      <section className="promotion-banner">
        <h2>Promoção do Dia</h2>
        <p>{currentPromotion}</p>
      </section>

      <section className="about-us">
        <h2>Sobre Nós</h2>
        <p>Desde 2010, trazendo o melhor da gastronomia para sua mesa...</p>
      </section>

      <section className="testimonials">
        <h2>Depoimentos</h2>
        {/* Adicione os depoimentos dos clientes aqui */}
      </section>
    </div>
  );
};

// components/Menu.jsx
import React, { useState } from 'react';

export const Menu = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [menuItems] = useState({
    entradas: [
      {
        id: 1,
        name: "Bruschetta",
        description: "Pão italiano com tomates e manjericão",
        price: 25.00,
        categories: ["vegetariano"],
        rating: 0,
        ratingCount: 0
      },
      // Adicione mais itens
    ],
    // Adicione mais categorias
  });

  const handleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter)
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleRating = (itemId, rating) => {
    // Implementar lógica de rating
  };

  return (
    <div className="menu">
      <div className="filters">
        <button onClick={() => handleFilter('vegetariano')}>Vegetariano</button>
        <button onClick={() => handleFilter('semGluten')}>Sem Glúten</button>
        <button onClick={() => handleFilter('pratosDoDia')}>Pratos do Dia</button>
      </div>

      {Object.entries(menuItems).map(([category, items]) => (
        <div key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="menu-items">
            {items
              .filter(item => 
                activeFilters.length === 0 || 
                activeFilters.some(filter => item.categories.includes(filter))
              )
              .map(item => (
                <div key={item.id} className="menu-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p className="price">R$ {item.price.toFixed(2)}</p>
                  <div className="rating">
                    {[1,2,3,4,5].map(star => (
                      <span
                        key={star}
                        onClick={() => handleRating(item.id, star)}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// components/Reservations.jsx
import React, { useState } from 'react';

export const Reservations = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 1
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
    if (!formData.date) newErrors.date = 'Data é obrigatória';
    if (!formData.time) newErrors.time = 'Hora é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Enviar dados para API
      setSubmitted(true);
    }
  };

  return (
    <div className="reservations">
      {submitted ? (
        <div className="success-message">
          <h2>Reserva Confirmada!</h2>
          <p>Você receberá um email de confirmação em breve.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Faça sua Reserva</h2>
          
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          {/* Adicione os outros campos do formulário */}
          
          <button type="submit">Confirmar Reserva</button>
        </form>
      )}
    </div>
  );
};

// components/Contact.jsx
import React, { useState } from 'react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Nome é obrigatório';
    if (!formData.email) newErrors.email = 'Email é obrigatório';
    if (!formData.message) newErrors.message = 'Mensagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Enviar dados para API
      alert('Mensagem enviada com sucesso!');
    }
  };

  return (
    <div className="contact">
      <div className="contact-info">
        <h2>Nosso Endereço</h2>
        <p>Rua Example, 123</p>
        <p>Cidade - Estado</p>
        <p>Tel: (11) 1234-5678</p>
      </div>

      <form onSubmit={handleSubmit}>
        <h2>Entre em Contato</h2>
        
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        {/* Adicione os outros campos do formulário */}
        
        <button type="submit">Enviar Mensagem</button>
      </form>

      <div className="map">
        {/* Adicione o mapa do Google aqui */}
      </div>
    </div>
  );
};
