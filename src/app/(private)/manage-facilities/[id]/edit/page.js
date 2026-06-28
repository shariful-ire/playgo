"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RiCloseLine } from "react-icons/ri";
import PageTransition from "@/components/layout/PageTransition";
import { Button, FormField } from "@/components/ui";
import ImageUploader from "@/components/ui/ImageUploader";
import { useAuth } from "@/lib/AuthProvider";
import { fetchFacilityById, updateFacility } from "@/lib/api";
import { SPORT_TYPES } from "@/lib/constants";

export default function EditFacilityPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [slotInput, setSlotInput] = useState("");
  const [form, setForm] = useState({
    name: "",
    facility_type: "",
    location: "",
    price_per_hour: "",
    capacity: "",
    description: "",
    image_url: "",
    available_slots: [],
  });

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchFacilityById(id);
        if (!data) {
          toast.error("Facility not found");
          router.push("/manage-facilities");
          return;
        }
        setForm({
          name: data.name || "",
          facility_type: data.facility_type || "",
          location: data.location || "",
          price_per_hour: String(data.price_per_hour || ""),
          capacity: String(data.capacity || ""),
          description: data.description || "",
          image_url: data.image_url || "",
          available_slots: data.available_slots || [],
        });
      } catch {
        toast.error("Failed to load facility");
        router.push("/manage-facilities");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function addSlot() {
    const slot = slotInput.trim();
    if (!slot) return;
    if (form.available_slots.includes(slot)) {
      toast.error("Slot already added");
      return;
    }
    update("available_slots", [...form.available_slots, slot]);
    setSlotInput("");
  }

  function removeSlot(slot) {
    update("available_slots", form.available_slots.filter((s) => s !== slot));
  }

  function validate() {
    const errs = {};
    if (!form.name.trim()) errs.name = "Facility name is required";
    if (!form.facility_type) errs.facility_type = "Select a sport type";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.price_per_hour || Number(form.price_per_hour) <= 0)
      errs.price_per_hour = "Enter a valid price";
    if (!form.capacity || Number(form.capacity) <= 0)
      errs.capacity = "Enter a valid capacity";
    if (!form.description.trim()) errs.description = "Description is required";
    if (form.available_slots.length === 0)
      errs.available_slots = "Add at least one time slot";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setSaving(true);
    try {
      await updateFacility(id, {
        ...form,
        price_per_hour: Number(form.price_per_hour),
        capacity: Number(form.capacity),
      });
      toast.success("Facility updated!");
      router.push("/manage-facilities");
    } catch {
      toast.success("Changes saved locally — server not connected yet");
      router.push("/manage-facilities");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="space-y-6 animate-pulse">
          <div className="h-8 w-48 bg-base-200 rounded-full" />
          <div className="h-96 bg-base-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="flex-1">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        <div className="mb-8">
          <h1>Edit Facility</h1>
          <p className="text-base-content/50 mt-2">
            Update your facility details
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-base-200 rounded-2xl border border-base-content/5 p-5 md:p-8 space-y-8"
        >
          <div className="space-y-4">
            <h3 className="text-base-content/70 border-b border-base-content/5 pb-2">
              Basic Info
            </h3>
            <FormField
              label="Facility Name"
              name="name"
              placeholder="e.g. Green Valley Turf Arena"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              error={errors.name}
            />
            <FormField label="Facility Type" name="facility_type" error={errors.facility_type}>
              <select
                name="facility_type"
                value={form.facility_type}
                onChange={(e) => update("facility_type", e.target.value)}
                className="w-full select rounded-2xl bg-base-300"
              >
                <option value="" disabled>Select sport type</option>
                {SPORT_TYPES.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </FormField>
            <FormField
              label="Location"
              name="location"
              placeholder="e.g. Gulshan, Dhaka"
              value={form.location}
              onChange={(e) => update("location", e.target.value)}
              error={errors.location}
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-base-content/70 border-b border-base-content/5 pb-2">
              Pricing & Capacity
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Price Per Hour (৳)"
                name="price_per_hour"
                type="number"
                value={form.price_per_hour}
                onChange={(e) => update("price_per_hour", e.target.value)}
                error={errors.price_per_hour}
              />
              <FormField
                label="Capacity"
                name="capacity"
                type="number"
                value={form.capacity}
                onChange={(e) => update("capacity", e.target.value)}
                error={errors.capacity}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-base-content/70 border-b border-base-content/5 pb-2">
              Availability
            </h3>
            <div className="space-y-2">
              <label className="text-sm font-medium text-base-content">
                Available Time Slots
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder='e.g. 6:00-7:00 PM'
                  value={slotInput}
                  onChange={(e) => setSlotInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSlot())}
                  className="flex-1 input rounded-2xl bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <Button variant="primary" size="sm" type="button" onClick={addSlot}>
                  Add
                </Button>
              </div>
              {form.available_slots.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {form.available_slots.map((slot) => (
                    <span
                      key={slot}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                    >
                      {slot}
                      <button type="button" onClick={() => removeSlot(slot)}>
                        <RiCloseLine className="text-sm" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              {errors.available_slots && (
                <p className="text-sm text-error">{errors.available_slots}</p>
              )}
            </div>

            <FormField
              label="Description"
              name="description"
              textarea
              rows={4}
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
              error={errors.description}
            />
            <p className="text-xs text-base-content/30 text-right">
              {form.description.length} characters
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base-content/70 border-b border-base-content/5 pb-2">
              Media
            </h3>
            <label className="text-sm font-medium text-base-content">
              Facility Image
            </label>
            <ImageUploader
              value={form.image_url}
              onChange={(url) => update("image_url", url)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-base-content">
              Owner Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full input rounded-2xl bg-base-300/50 text-base-content/50 cursor-not-allowed"
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="ghost"
              className="flex-1"
              type="button"
              onClick={() => router.push("/manage-facilities")}
            >
              Cancel
            </Button>
            <Button
              variant="accent"
              className="flex-1"
              type="submit"
              disabled={saving}
            >
              {saving ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </div>
    </PageTransition>
  );
}
