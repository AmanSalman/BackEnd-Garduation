import { CouponModel } from "../../../DB/models/coupon.model.js"

export const create = async (req, res) => {
  try {
    const { name, Amount, status } = req.body;
    const check = await CouponModel.findOne({ name });
    if (check) {
      return res.status(409).json({ message: "Coupon already exists" });
    }
    const coupon = await CouponModel.create({ name, Amount, status });
    return res.json({ message: "success", coupon });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create coupon", error });
  }
};

export const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await CouponModel.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    return res.status(200).json({ message: "success", coupon });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch coupon", error });
  }
};

export const getAll = async (req, res) => {
  try {
    const coupons = await CouponModel.find();
    return res.status(200).json({ message: "success", coupons });
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch coupons", error });
  }
};

export const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await CouponModel.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    await CouponModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete coupon", error });
  }
};

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await CouponModel.findById(id);
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const { name, Amount, status } = req.body;
    if (name) {
      const check = await CouponModel.findOne({ name });
      if (check) {
        return res.status(409).json({ message: "Coupon already exists" });
      }
      coupon.name = name;
    }
    if (Amount) {
      coupon.Amount = Amount;
    }
    if (status) {
      coupon.status = status;
    }

    await coupon.save();
    return res.status(200).json({ message: "success", coupon });
  } catch (error) {
    return res.status(500).json({ message: "Failed to update coupon", error });
  }
};
