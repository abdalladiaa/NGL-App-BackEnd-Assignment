import mongoose from "mongoose";
import { RequestStatusEnum } from "../../lib/enums/identity-request.enum.js";

const identityRequestSchema = mongoose.Schema(
  {
    message: {
      type: mongoose.Types.ObjectId,
      unique: true,
      required: true,
      ref: "Message",
    },
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(RequestStatusEnum),
      default: RequestStatusEnum.PENDING,
    },
  },
  {
    timestamps: true,
  },
);

const IdentityRequest =
  mongoose.models.IdentityRequest ||
  mongoose.model("IdentityRequest", identityRequestSchema);

export default IdentityRequest;
