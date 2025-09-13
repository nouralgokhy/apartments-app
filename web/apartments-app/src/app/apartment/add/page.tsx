'use client';
import { useEffect, useState } from 'react';
import { addApartment, ApartmentCreateError } from '../../api/apartments';
import { fetchProjects } from '../../api/projects';
import CustomHeader from '../../components/CustomHeader';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

const inputBase =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 text-base';
const labelBase = 'block text-sm font-medium text-gray-700 mb-1';

const initialState = {
  name: '',
  unitNumber: '',
  price: '',
  bedrooms: '',
  bathrooms: '',
  area: '',
  projectId: 0,
  images: [''],
};

export default function AddApartmentPage() {
  const [form, setForm] = useState<typeof initialState>(initialState);
  const [errors, setErrors] = useState<ApartmentCreateError['details']>([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<{ id: number; name: string }[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        if ('error' in data) {
          setProjects([]);
          setErrorMessage('Failed to load projects. Please try again.');
        } else {
          setProjects(data);
        }
      } catch (err) {
        console.error('Failed to load projects', err);
        setErrorMessage('Failed to load projects. Please try again.');
      }
    };
    loadProjects();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'projectId' ? Number(value) : value, // ensure number for projectId
    }));
  };

  const handleImageChange = (idx: number, value: string) => {
    setForm((prev) => {
      const images = [...prev.images];
      images[idx] = value;
      return { ...prev, images };
    });
  };

  const addImageField = () => setForm((prev) => ({ ...prev, images: [...prev.images, ''] }));
  const removeImageField = (idx: number) =>
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setErrors([]);
    setErrorMessage(null);
    try {
      const payload = {
        ...form,
        projectId: Number(form.projectId), 
        price: Number(form.price),
        bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
        bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
        area: form.area ? Number(form.area) : undefined,
        images: form.images.filter((url) => url.trim()).map((url) => ({ url: url.trim() })),
      } as const;

      const result = await addApartment(payload);
      if ('error' in result) {
        if ('details' in result && Array.isArray(result.details) && result.details.length) {
          setErrors(result.details);
          setErrorMessage('Please fix the highlighted fields and try again.');
        } else {
          setErrors([{ path: '', message: result.error }]);
          setErrorMessage(result.error || 'Something went wrong. Please try again.');
        }
      } else {
        setShowSuccess(true);
        setForm(initialState);
      }
    } catch (err) {
      console.error(err);
      setErrors([{ path: '', message: 'Failed to add apartment.' }]);
      setErrorMessage('Failed to add apartment. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getError = (field: string) => {
    const found = errors.find((e) => e.path === field);
    return found ? found.message : '';
  };

  const isFormValid = Boolean(form.name && form.unitNumber && form.price && form.projectId);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100">
      <CustomHeader title="Add Apartment" />
      <div className="h-[76px] md:h-[82px]" />

      <main className="mx-auto my-6 md:my-10 w-full max-w-3xl">
        <section className="rounded-2xl bg-white shadow-xl ring-1 ring-black/5 p-4 md:p-10">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">Create a new listing</h2>
              <p className="text-sm text-gray-500">Fill in the details below. Fields marked * are required.</p>
            </div>
          </div>

          <Snackbar
            open={showSuccess}
            autoHideDuration={3000}
            onClose={() => setShowSuccess(false)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert elevation={6} variant="filled" severity="success" sx={{ width: '100%' }}>
              Apartment added successfully!
            </MuiAlert>
          </Snackbar>

          <Snackbar
            open={Boolean(errorMessage)}
            autoHideDuration={4000}
            onClose={() => setErrorMessage(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <MuiAlert elevation={6} variant="filled" severity="error" sx={{ width: '100%' }}>
              {errorMessage}
            </MuiAlert>
          </Snackbar>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className={labelBase} htmlFor="name">Name*</label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputBase}
                placeholder="e.g., Park View Apartment"
              />
              {getError('name') && <span className="text-red-600 text-xs font-medium">{getError('name')}</span>}
            </div>

            <div>
              <label className={labelBase} htmlFor="unitNumber">Unit Number*</label>
              <input
                id="unitNumber"
                name="unitNumber"
                value={form.unitNumber}
                onChange={handleChange}
                required
                className={inputBase}
                placeholder="e.g., A-302"
              />
              {getError('unitNumber') && (
                <span className="text-red-600 text-xs font-medium">{getError('unitNumber')}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="price">Price (EGP)*</label>
              <input
                id="price"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                type="number"
                min={0}
                className={inputBase}
                placeholder="e.g., 2500000"
              />
              {getError('price') && <span className="text-red-600 text-xs font-medium">{getError('price')}</span>}
            </div>

            <div>
              <label className={labelBase} htmlFor="bedrooms">Bedrooms</label>
              <input
                id="bedrooms"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                type="number"
                min={0}
                className={inputBase}
                placeholder="e.g., 3"
              />
              {getError('bedrooms') && (
                <span className="text-red-600 text-xs font-medium">{getError('bedrooms')}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="bathrooms">Bathrooms</label>
              <input
                id="bathrooms"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                type="number"
                min={0}
                className={inputBase}
                placeholder="e.g., 2"
              />
              {getError('bathrooms') && (
                <span className="text-red-600 text-xs font-medium">{getError('bathrooms')}</span>
              )}
            </div>

            <div>
              <label className={labelBase} htmlFor="area">Area (m²)</label>
              <input
                id="area"
                name="area"
                value={form.area}
                onChange={handleChange}
                type="number"
                min={0}
                className={inputBase}
                placeholder="e.g., 145"
              />
              {getError('area') && <span className="text-red-600 text-xs font-medium">{getError('area')}</span>}
            </div>

            <div className="md:col-span-2">
              <label className={labelBase} htmlFor="projectId">Project*</label>
              <select
                id="projectId"
                name="projectId"
                value={form.projectId}
                onChange={handleChange}
                required
                className={`${inputBase} appearance-none pr-10`}
              >
                <option value={0}> Select a project </option>
                {projects.map((p) => (
                  <option key={p.id} value={Number(p.id)}>
                    {p.name}
                  </option>
                ))}
              </select>
              {getError('projectId') && (
                <span className="text-red-600 text-xs font-medium">{getError('projectId')}</span>
              )}
            </div>

            <div className="md:col-span-2">
              <label className={labelBase}>Images (URLs)</label>
              <div className="space-y-2">
                {form.images.map((url, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      value={url}
                      onChange={(e) => handleImageChange(idx, e.target.value)}
                      placeholder={`Image URL #${idx + 1}`}
                      className={inputBase}
                    />
                    <button
                      type="button"
                      onClick={() => removeImageField(idx)}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      aria-label={`Remove image ${idx + 1}`}
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="inline-flex items-center gap-2 text-sm font-medium text-blue-700 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 4.5a.75.75 0 01.75.75V11h5.75a.75.75 0 010 1.5H12.75v5.75a.75.75 0 01-1.5 0V12.5H5.5a.75.75 0 010-1.5h5.75V5.25A.75.75 0 0112 4.5z" />
                  </svg>
                  Add image
                </button>
              </div>
            </div>

            <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={loading}
                onClick={() => setForm(initialState)}
                className="rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={loading || !isFormValid}
                className={`rounded-xl px-5 py-3 text-sm font-semibold shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600
                  ${loading || !isFormValid
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                    : 'bg-blue-700 text-white hover:bg-blue-800'}
                `}
              >
                {loading ? (
                  <div className="flex items-center justify-center px-4 py-1.5">
                    <CircularProgress size={24} color="primary" />
                  </div>
                ) : (
                  'Add Apartment'
                )}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
