import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await contactService.create(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const result = await contactService.getContact(user, contactId);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;
    const request = req.body;
    request.id = contactId;
    const result = await contactService.update(user, request);
    res.status(200).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const user = req.user;
    const contactId = req.params.contactId;

    await contactService.remove(user, contactId);
    res.status(200).json({
      data: "OK",
    });
  } catch (error) {
    next(error);
  }
};

export default { create, getContact, updateContact, removeContact };
