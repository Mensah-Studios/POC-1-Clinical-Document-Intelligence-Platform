import { useState } from "react";
import type { SubmitEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { CircleXIcon, KeyIcon, LockIcon, MailIcon, ShieldCheckIcon, UnlockIcon } from "../../components/icons/Icons";
import BrandHeader from "../../components/login/BrandHeader";
import CertificationBadge from "../../components/login/CertificationBadge";
import AuthProviderButton from "../../components/login/AuthProviderButton";
import Divider from "../../components/login/Divider";
import InputField from "../../components/login/InputField";
import PasswordToggle from "../../components/login/PasswordToggle";
import ComplianceNotice from "../../components/login/ComplianceNotice";
import { CERTIFICATIONS, LOGIN_CONTENT } from "../../constants/constants";
import { APP_NAME } from "../../constants/navigation";
import { MOBILE_LOGIN_CONTENT } from "../../constants/mobile";

export default function MobileLogin():JSX.Element{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const content = MOBILE_LOGIN_CONTENT;

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return <main role='main' aria-label='mobile-login-form' className="min-h-svh bg-surface-2 text-left font-body">
        <section role="region" aria-label="Platform overview" className="bg-linear-to-br from-teal-1 to-teal-2 px-5 pt-6 pb-6 text-surface-1">
            <BrandHeader />
            <h1 className="mt-4 font-heading text-2xl leading-tight font-bold">{content.hero.heading}</h1>
            <p className="mt-3 text-sm leading-relaxed text-surface-1/90">{content.hero.description}</p>
            <ul role="list" aria-label="Compliance certifications" className="mt-4 flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => <CertificationBadge key={cert} label={cert} />)}
            </ul>
        </section>

        <section aria-label={`${APP_NAME} access`} className="mx-4 border-x border-b border-border-color bg-surface-1 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-md bg-teal-1 text-surface-1">
                        <ShieldCheckIcon className="size-5" />
                    </span>
                    <span className="font-heading text-lg font-bold text-slate-1">{APP_NAME}</span>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-green-2 px-2.5 py-1 text-[11px] font-semibold text-green-1 uppercase">
                    <span aria-hidden="true" className="size-1.5 rounded-full bg-green-1" />
                    {content.brandCard.badge}
                </span>
            </div>
            <p className="mt-2 text-xs text-slate-3">{content.brandCard.description}</p>
        </section>

        <section role="region" aria-labelledby="mobile-sign-in-heading" className="px-5 py-6">
            <h2 id="mobile-sign-in-heading" className="font-heading text-2xl font-bold text-slate-1">{content.signIn.heading}</h2>
            <p className="mt-1 text-sm text-slate-3">{content.signIn.description}</p>

            <div role="group" aria-label="Single sign-on options" className="mt-5 flex flex-col gap-3">
                <AuthProviderButton icon={<CircleXIcon className="size-4 text-warning-1" />} label={content.authProviders.epic} />
                <AuthProviderButton icon={<KeyIcon className="size-4 text-teal-1" />} label={content.authProviders.sso} />
            </div>

            <Divider label={LOGIN_CONTENT.dividerLabel} />

            <form role="form" aria-label="Email sign-in" onSubmit={handleSubmit} className="flex flex-col">
                <label htmlFor="mobile-email" className="text-sm font-semibold text-slate-1">{LOGIN_CONTENT.form.emailLabel}</label>
                <InputField
                    id="mobile-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={LOGIN_CONTENT.form.emailPlaceholder}
                    icon={<MailIcon className="size-4 shrink-0 text-slate-2" />}
                />

                <div className="mt-5 flex items-center justify-between">
                    <label htmlFor="mobile-password" className="text-sm font-semibold text-slate-1">{LOGIN_CONTENT.form.passwordLabel}</label>
                    <a href="#" aria-label={LOGIN_CONTENT.form.resetCredentials} className="text-xs font-semibold text-teal-1 hover:underline">{content.reset}</a>
                </div>
                <InputField
                    id="mobile-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<LockIcon className="size-4 shrink-0 text-slate-2" />}
                    trailing={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} controls="mobile-password" />}
                />

                <button type="submit" aria-label={content.submit} className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-teal-1 py-3.5 text-sm font-semibold text-surface-1 transition-colors hover:bg-teal-2">
                    <UnlockIcon className="size-4" />
                    {content.submit}
                </button>
            </form>

            <ComplianceNotice>{content.complianceNotice}</ComplianceNotice>
        </section>
    </main>
}
