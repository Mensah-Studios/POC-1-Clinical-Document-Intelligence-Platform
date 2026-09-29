import { useState } from "react";
import type { SubmitEvent } from "react";
import type { JSX } from "react/jsx-runtime";
import { CircleXIcon, KeyIcon, LockIcon, MailIcon, UnlockIcon } from "../../components/icons/Icons";
import BrandHeader from "../../components/login/BrandHeader";
import FeatureItem from "../../components/login/FeatureItem";
import CertificationBadge from "../../components/login/CertificationBadge";
import AuthProviderButton from "../../components/login/AuthProviderButton";
import Divider from "../../components/login/Divider";
import InputField from "../../components/login/InputField";
import PasswordToggle from "../../components/login/PasswordToggle";
import ComplianceNotice from "../../components/login/ComplianceNotice";
import { CERTIFICATIONS, FEATURES, LOGIN_CONTENT } from "../../constants/constants";

export default function Login():JSX.Element{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
    }

    return <main role='main' aria-label='login-form' className="grid h-screen w-screen grid-cols-2 overflow-hidden text-left font-body">
        <section role="region" aria-label="Platform overview" className="flex flex-col justify-between overflow-y-auto bg-linear-to-br from-teal-1 to-teal-2 px-16 py-16 text-surface-1">
            <div>
                <BrandHeader />

                <h1 className="mt-12 max-w-2xl font-heading text-4xl leading-tight font-bold text-surface-1">
                    {LOGIN_CONTENT.hero.heading}
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-relaxed text-surface-1/90">
                    {LOGIN_CONTENT.hero.description}
                </p>

                <ul role="list" aria-label="Security features" className="mt-10 flex flex-col gap-6">
                    {FEATURES.map(({ title, description }) => (
                        <FeatureItem key={title} title={title} description={description} />
                    ))}
                </ul>
            </div>

            <ul role="list" aria-label="Compliance certifications" className="mt-12 flex gap-6">
                {CERTIFICATIONS.map((cert) => (
                    <CertificationBadge key={cert} label={cert} />
                ))}
            </ul>
        </section>

        <section role="region" aria-labelledby="sign-in-heading" className="flex items-center justify-center overflow-y-auto bg-surface-1 px-16 py-16">
            <div className="w-full max-w-md">
                <header aria-label="Sign in header">
                    <h2 id="sign-in-heading" className="font-heading text-3xl font-bold text-slate-1">{LOGIN_CONTENT.signIn.heading}</h2>
                    <p className="mt-2 text-sm text-slate-3">
                        {LOGIN_CONTENT.signIn.description}
                    </p>
                </header>

                <div role="group" aria-label="Single sign-on options" className="mt-8 flex flex-col gap-3">
                    <AuthProviderButton icon={<CircleXIcon className="size-4 text-warning-1" />} label={LOGIN_CONTENT.authProviders.epic} />
                    <AuthProviderButton icon={<KeyIcon className="size-4 text-teal-1" />} label={LOGIN_CONTENT.authProviders.sso} />
                </div>

                <Divider label={LOGIN_CONTENT.dividerLabel} />

                <form role="form" aria-label="Email sign-in" onSubmit={handleSubmit} className="flex flex-col">
                    <label htmlFor="email" className="text-sm font-semibold text-slate-1">{LOGIN_CONTENT.form.emailLabel}</label>
                    <InputField
                        id="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={LOGIN_CONTENT.form.emailPlaceholder}
                        icon={<MailIcon className="size-4 shrink-0 text-slate-2" />}
                    />

                    <div className="mt-6 flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-semibold text-slate-1">{LOGIN_CONTENT.form.passwordLabel}</label>
                        <a href="#" aria-label={LOGIN_CONTENT.form.resetCredentials} className="text-xs font-semibold text-teal-1 hover:underline">{LOGIN_CONTENT.form.resetCredentials}</a>
                    </div>
                    <InputField
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        icon={<LockIcon className="size-4 shrink-0 text-slate-2" />}
                        trailing={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} controls="password" />}
                    />

                    <button type="submit" aria-label={LOGIN_CONTENT.form.submit} className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-teal-1 py-3 text-sm font-semibold text-surface-1 transition-colors hover:bg-teal-2">
                        <UnlockIcon className="size-4" />
                        {LOGIN_CONTENT.form.submit}
                    </button>
                </form>

                <ComplianceNotice>{LOGIN_CONTENT.complianceNotice}</ComplianceNotice>
            </div>
        </section>
    </main>
}
