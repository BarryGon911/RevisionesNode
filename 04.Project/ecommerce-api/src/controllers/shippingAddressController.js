import ShippingAddress from '../models/shippingAddress.js';

async function getShippingAddresses(req, res) {
  try {
    const shippingAddresses = await ShippingAddress.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json(shippingAddresses);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getShippingAddressById(req, res) {
  try {
    const id = req.params.id;
    const shippingAddress = await ShippingAddress.findById(id)
      .populate('user', 'name email');
    if (!shippingAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
    res.json(shippingAddress);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function getShippingAddressesByUser(req, res) {
  try {
    const userId = req.params.userId;
    const shippingAddresses = await ShippingAddress.find({ user: userId })
      .sort({ isDefault: -1, createdAt: -1 });
    if (shippingAddresses.length === 0) {
      return res.status(404).json({ message: 'No shipping addresses found for this user' });
    }
    res.json(shippingAddresses);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function createShippingAddress(req, res) {
  try {
    const { 
      user, 
      name, 
      address, 
      city, 
      state, 
      postalCode, 
      country, 
      phone,
      isDefault,
      addressType
    } = req.body;
    
    if (!user || !name || !address || !city || !state || !postalCode || !phone) {
      return res.status(400).json({ 
        error: 'Required fields: user, name, address, city, state, postalCode, phone' 
      });
    }

    // Si esta dirección se marca como predeterminada, desmarcar las demás del usuario
    if (isDefault) {
      await ShippingAddress.updateMany(
        { user: user },
        { isDefault: false }
      );
    }
    
    const newShippingAddress = await ShippingAddress.create({
      user, 
      name, 
      address, 
      city, 
      state, 
      postalCode, 
      country: country || 'México', 
      phone,
      isDefault: isDefault || false,
      addressType: addressType || 'home'
    });

    const populatedAddress = await ShippingAddress.findById(newShippingAddress._id)
      .populate('user', 'name email');
    
    res.status(201).json(populatedAddress);
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function updateShippingAddress(req, res) {
  try {
    const { id } = req.params;
    const { 
      name, 
      address, 
      city, 
      state, 
      postalCode, 
      country, 
      phone,
      isDefault,
      addressType
    } = req.body;
    
    // Si esta dirección se marca como predeterminada, desmarcar las demás del usuario
    if (isDefault) {
      const currentAddress = await ShippingAddress.findById(id);
      if (currentAddress) {
        await ShippingAddress.updateMany(
          { user: currentAddress.user, _id: { $ne: id } },
          { isDefault: false }
        );
      }
    }
    
    const updatedShippingAddress = await ShippingAddress.findByIdAndUpdate(id,
      {
        name, 
        address, 
        city, 
        state, 
        postalCode, 
        country, 
        phone,
        isDefault,
        addressType
      }, { new: true })
      .populate('user', 'name email');

    if (updatedShippingAddress) {
      return res.status(200).json(updatedShippingAddress);
    } else {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
  } catch (error) {
    res.status(500).send({ error });
  }
}

async function deleteShippingAddress(req, res) {
  try {
    const { id } = req.params;
    const deletedShippingAddress = await ShippingAddress.findByIdAndDelete(id);

    if (deletedShippingAddress) {
      return res.status(204).send();
    } else {
      return res.status(404).json({ message: 'Shipping address not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

async function setDefaultAddress(req, res) {
  try {
    const { id } = req.params;
    
    // Obtener la dirección actual
    const currentAddress = await ShippingAddress.findById(id);
    if (!currentAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    // Desmarcar todas las direcciones predeterminadas del usuario
    await ShippingAddress.updateMany(
      { user: currentAddress.user },
      { isDefault: false }
    );

    // Marcar esta dirección como predeterminada
    const updatedAddress = await ShippingAddress.findByIdAndUpdate(
      id,
      { isDefault: true },
      { new: true }
    ).populate('user', 'name email');

    res.json(updatedAddress);
  } catch (error) {
    res.status(500).send({ error });
  }
}

export {
  getShippingAddresses,
  getShippingAddressById,
  getShippingAddressesByUser,
  createShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
  setDefaultAddress,
};
