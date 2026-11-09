import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { ArrowUpRight, LoaderCircle } from 'lucide-react';
import { Link } from 'react-router';
import { productCategories, services } from '../data/catalog';
import { submitLead, type LeadPayload } from '../services/leadSubmission';

type LeadFormProps = {
  mode: 'contact' | 'quote';
  initialProduct?: string;
  initialService?: string;
};

export function LeadForm({ mode, initialProduct = '', initialService = '' }: LeadFormProps) {
  const { t } = useTranslation();
  const [result, setResult] = useState<'idle' | 'sent' | 'not-configured' | 'failed'>('idle');
  const schema = useMemo(
    () =>
      z.object({
        fullName: z.string().trim().min(2, t('forms.validation.name')),
        companyName: z.string().optional(),
        email: z.string().trim().email(t('forms.validation.email')),
        phone: z.string().trim().min(6, t('forms.validation.phone')),
        customerType:
          mode === 'quote'
            ? z.string().min(1, t('forms.validation.customerType'))
            : z.string().optional(),
        service: z.string().min(1, t('forms.validation.service')),
        equipment: z.string().optional(),
        subject:
          mode === 'contact'
            ? z.string().trim().min(3, t('forms.validation.subject'))
            : z.string().optional(),
        message: z.string().trim().min(20, t('forms.validation.message')),
        preferredContact:
          mode === 'quote'
            ? z.string().min(1, t('forms.validation.preferredContact'))
            : z.string().optional(),
        consent: z.boolean().refine(Boolean, t('forms.validation.consent')),
      }),
    [mode, t],
  );

  type FormValues = z.infer<typeof schema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      customerType: '',
      service: initialService,
      equipment: initialProduct,
      subject: '',
      message: '',
      preferredContact: 'email',
      consent: false,
    },
  });

  async function onSubmit(values: FormValues) {
    setResult('idle');
    const payload: LeadPayload = {
      fullName: values.fullName,
      companyName: values.companyName,
      email: values.email,
      phone: values.phone,
      customerType: values.customerType,
      service: values.service,
      equipment: values.equipment,
      subject: values.subject,
      message: values.message,
      preferredContact: values.preferredContact,
    };
    const response = await submitLead(payload);
    setResult(response.status);
    if (response.status === 'sent')
      form.reset({ ...form.getValues(), message: '', consent: false });
  }

  const errorFor = (field: keyof FormValues) => form.formState.errors[field]?.message;
  const inputClass = (field: keyof FormValues) =>
    `form-control ${errorFor(field) ? 'form-control--error' : ''}`;

  return (
    <form className="lead-form" noValidate onSubmit={form.handleSubmit(onSubmit)}>
      <div className="form-grid">
        <label className="form-field">
          <span>
            {t('forms.fullName')} <b>*</b>
          </span>
          <input
            autoComplete="name"
            className={inputClass('fullName')}
            {...form.register('fullName')}
          />
          {errorFor('fullName') && <small className="form-error">{errorFor('fullName')}</small>}
        </label>
        {mode === 'quote' && (
          <label className="form-field">
            <span>{t('forms.companyName')}</span>
            <input
              autoComplete="organization"
              className={inputClass('companyName')}
              {...form.register('companyName')}
            />
          </label>
        )}
        <label className="form-field">
          <span>
            {t('forms.email')} <b>*</b>
          </span>
          <input
            autoComplete="email"
            className={inputClass('email')}
            type="email"
            {...form.register('email')}
          />
          {errorFor('email') && <small className="form-error">{errorFor('email')}</small>}
        </label>
        <label className="form-field">
          <span>
            {t('forms.phone')} <b>*</b>
          </span>
          <input
            autoComplete="tel"
            className={inputClass('phone')}
            type="tel"
            {...form.register('phone')}
          />
          {errorFor('phone') && <small className="form-error">{errorFor('phone')}</small>}
        </label>
        {mode === 'quote' && (
          <label className="form-field">
            <span>
              {t('forms.customerType')} <b>*</b>
            </span>
            <select className={inputClass('customerType')} {...form.register('customerType')}>
              <option value="">{t('forms.selectCustomerType')}</option>
              {['individual', 'smallBusiness', 'company', 'institution'].map((key) => (
                <option key={key} value={key}>
                  {t(`forms.customerTypes.${key}`)}
                </option>
              ))}
            </select>
            {errorFor('customerType') && (
              <small className="form-error">{errorFor('customerType')}</small>
            )}
          </label>
        )}
        <label className="form-field">
          <span>
            {t('forms.service')} <b>*</b>
          </span>
          <select className={inputClass('service')} {...form.register('service')}>
            <option value="">{t('forms.selectService')}</option>
            {services.map((service) => (
              <option key={service.id} value={service.slug}>
                {t(`services.items.${service.id}.title`)}
              </option>
            ))}
          </select>
          {errorFor('service') && <small className="form-error">{errorFor('service')}</small>}
        </label>
        {mode === 'contact' && (
          <label className="form-field">
            <span>
              {t('forms.subject')} <b>*</b>
            </span>
            <input className={inputClass('subject')} {...form.register('subject')} />
            {errorFor('subject') && <small className="form-error">{errorFor('subject')}</small>}
          </label>
        )}
        {mode === 'quote' && (
          <label className="form-field">
            <span>{t('forms.equipment')}</span>
            <select className={inputClass('equipment')} {...form.register('equipment')}>
              <option value="">{t('forms.selectCategory')}</option>
              {productCategories.map((category) => (
                <option key={category} value={category}>
                  {t(`products.categories.${category}`)}
                </option>
              ))}
              <option value="other">{t('common.other')}</option>
            </select>
          </label>
        )}
        {mode === 'quote' && (
          <label className="form-field">
            <span>
              {t('forms.preferredContact')} <b>*</b>
            </span>
            <select
              className={inputClass('preferredContact')}
              {...form.register('preferredContact')}
            >
              <option value="email">{t('forms.contactMethods.email')}</option>
              <option value="phone">{t('forms.contactMethods.phone')}</option>
              <option value="whatsapp">{t('forms.contactMethods.whatsapp')}</option>
            </select>
          </label>
        )}
        <label className="form-field form-field--wide">
          <span>
            {t('forms.message')} <b>*</b>
          </span>
          <textarea className={inputClass('message')} rows={5} {...form.register('message')} />
          {errorFor('message') && <small className="form-error">{errorFor('message')}</small>}
        </label>
        <label className="form-consent form-field--wide">
          <input type="checkbox" {...form.register('consent')} />
          <span>
            {t('forms.consent')} <Link to="/privacy-policy">{t('footer.privacy')}</Link>.
          </span>
        </label>
        {errorFor('consent') && (
          <small className="form-error form-field--wide">{errorFor('consent')}</small>
        )}
      </div>

      <div aria-live="polite" className="form-feedback">
        {result === 'sent' && <p className="form-feedback--success">{t('forms.submitted')}</p>}
        {result === 'not-configured' && (
          <p className="form-feedback--notice">{t('forms.notConnected')}</p>
        )}
        {result === 'failed' && <p className="form-feedback--error">{t('forms.failed')}</p>}
      </div>
      <button
        className="button button--primary form-submit"
        disabled={form.formState.isSubmitting}
        type="submit"
      >
        {form.formState.isSubmitting ? (
          <>
            <LoaderCircle className="spin" size={17} />
            {t('forms.sending')}
          </>
        ) : (
          <>
            {mode === 'quote' ? t('forms.sendQuote') : t('forms.sendMessage')}{' '}
            <ArrowUpRight aria-hidden="true" size={17} />
          </>
        )}
      </button>
      <p className="form-note">{t('forms.requiredNote')}</p>
    </form>
  );
}
