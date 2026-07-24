import React, { useState } from 'react'
import { useForm, useWatch, type Control, type UseFormRegister } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  ArrowRight,
  Command,
  Loader2,
  AlertCircle,
  CheckCircle2,
  type LucideIcon,
} from 'lucide-react'

// ==========================================
// 1. SCHEMAS DE VALIDAÇÃO (ZOD)
// ==========================================

const loginSchema = z.object({
  email: z.string().min(1, 'E-mail é obrigatório.').email('E-mail inválido.'),
  password: z.string().min(1, 'Senha é obrigatória.'),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z
  .object({
    name: z.string().trim().min(2, 'Mínimo 2 caracteres.'),
    email: z.string().min(1, 'E-mail é obrigatório.').email('E-mail inválido.'),
    password: z
      .string()
      .min(8, 'Mínimo 8 caracteres.')
      .regex(/[A-Z]/, 'Uma maiúscula.')
      .regex(/[a-z]/, 'Uma minúscula.')
      .regex(/[0-9]/, 'Um número.')
      .regex(/[^A-Za-z0-9]/, 'Um caractere especial.'),
    confirmPassword: z.string().min(1, 'Confirme sua senha.'),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: 'Aceite os termos de uso.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  })

type LoginFormValues = z.infer<typeof loginSchema>
type RegisterFormValues = z.infer<typeof registerSchema>
type FeedbackType = { type: 'success' | 'error'; message: string } | null

// ==========================================
// 2. UTILITÁRIOS (FORÇA DA SENHA)
// ==========================================

const REQS = [
  { label: '8+ chars', re: /.{8,}/ },
  { label: 'Maiúscula', re: /[A-Z]/ },
  { label: 'Minúscula', re: /[a-z]/ },
  { label: 'Número', re: /[0-9]/ },
  { label: 'Símbolo', re: /[^A-Za-z0-9]/ },
]

function getPasswordStrength(password: string) {
  if (!password) return { score: 0, label: '', color: 'bg-zinc-800' }
  const passed = REQS.filter((r) => r.re.test(password)).length

  if (passed <= 2) return { score: 1, label: 'Fraca', color: 'bg-red-500' }
  if (passed === 3) return { score: 2, label: 'Média', color: 'bg-amber-500' }
  if (passed === 4) return { score: 3, label: 'Boa', color: 'bg-zinc-400' }
  return { score: 4, label: 'Forte', color: 'bg-white' }
}

// ==========================================
// 3. COMPONENTES DE UI COMPARTILHADOS
// ==========================================

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  icon: LucideIcon
  error?: string
  isPassword?: boolean
}

const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, icon: Icon, error, isPassword, className = '', ...props }, ref) => {
    const [show, setShow] = useState(false)
    const inputType = isPassword ? (show ? 'text' : 'password') : props.type || 'text'

    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-zinc-400">{label}</label>
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500 pointer-events-none transition-colors peer-focus:text-white" />
          <input
            ref={ref}
            type={inputType}
            aria-invalid={!!error}
            className={`peer w-full h-10 rounded-lg border bg-zinc-950/50 pl-9 ${
              isPassword ? 'pr-10' : 'pr-3'
            } text-sm text-zinc-100 placeholder-zinc-600 outline-none transition-all duration-200 
            focus:bg-zinc-900 focus:ring-2 focus:ring-white/10 ${
              error
                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                : 'border-zinc-800 hover:border-zinc-700 focus:border-zinc-600'
            } ${className}`}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center gap-1 text-xs text-red-400 mt-1"
            >
              <AlertCircle className="h-3 w-3 shrink-0" />
              <span>{error}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)
FormInput.displayName = 'FormInput'

function PasswordStrengthField({
  control,
  register,
  error,
}: {
  control: Control<RegisterFormValues>
  register: UseFormRegister<RegisterFormValues>
  error?: string
}) {
  const passwordValue = useWatch({ control, name: 'password', defaultValue: '' })
  const strengthInfo = getPasswordStrength(passwordValue)

  return (
    <div className="space-y-1">
      <FormInput
        label="Senha"
        icon={Lock}
        isPassword
        placeholder="••••••••"
        error={error}
        {...register('password')}
      />
      <AnimatePresence>
        {passwordValue.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-1.5 space-y-1">
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      step <= strengthInfo.score ? strengthInfo.color : 'bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
              <div className="text-right">
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                  {strengthInfo.label}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ==========================================
// 4. SUB-COMPONENTES DE SEÇÃO
// ==========================================

function LeftBrandingPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between p-8 bg-zinc-950 border-r border-zinc-800/80 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-zinc-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-sm">
          <Command className="h-4 w-4" />
        </div>
        <span className="text-lg font-semibold tracking-tight text-white">NeverX</span>
      </div>
      <div className="relative z-10 space-y-4 my-auto">
        <h1 className="text-2xl font-medium tracking-tight text-white leading-tight">
          Acelere suas vendas. <br />
          <span className="text-zinc-500">Nunca perca o controle.</span>
        </h1>
        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
          Uma suíte completa para gestão empresarial. Pipelines precisos e análises em tempo real.
        </p>
        <ul className="space-y-2.5 pt-4 border-t border-zinc-800/60">
          {['Pipeline inteligente', 'Relatórios preditivos', 'Segurança corporativa'].map((feature, i) => (
            <li key={i} className="flex items-center gap-2.5 text-sm text-zinc-300">
              <CheckCircle2 className="h-4 w-4 text-zinc-500" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="relative z-10 text-[11px] text-zinc-600 font-mono">
        © {new Date().getFullYear()} NeverX Inc.
      </div>
    </div>
  )
}

function SocialButtons() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 h-10 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="16" height="16" className="shrink-0">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
        </svg>
        Google
      </button>
      <button
        type="button"
        className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/50 h-10 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16" className="shrink-0 text-white">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
        GitHub
      </button>
    </div>
  )
}

// ==========================================
// 5. FORMULÁRIOS SEPARADOS
// ==========================================

function LoginForm({ setFeedback }: { setFeedback: (f: FeedbackType) => void }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (_values: LoginFormValues) => {
    setFeedback(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setFeedback({ type: 'success', message: 'Autenticado com sucesso!' })
      reset()
    } catch {
      setFeedback({ type: 'error', message: 'Erro ao autenticar.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div className="space-y-3">
        <FormInput
          label="E-mail corporativo"
          icon={Mail}
          type="email"
          placeholder="nome@empresa.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <FormInput
          label="Senha"
          icon={Lock}
          isPassword
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>

      <div className="flex items-center justify-between text-xs">
        <label className="flex items-center gap-2 text-zinc-400 hover:text-zinc-200 cursor-pointer transition-colors">
          <input
            type="checkbox"
            className="h-3.5 w-3.5 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-0 cursor-pointer"
            {...register('rememberMe')}
          />
          <span>Lembrar de mim</span>
        </label>
        <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-zinc-400 hover:text-white transition-colors">
          Esqueceu a senha?
        </a>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white h-10 text-sm font-medium text-black transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Acessar plataforma
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  )
}

function RegisterForm({ setFeedback }: { setFeedback: (f: FeedbackType) => void }) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (_values: RegisterFormValues) => {
    setFeedback(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setFeedback({ type: 'success', message: 'Conta criada com sucesso!' })
      reset()
    } catch {
      setFeedback({ type: 'error', message: 'Erro ao criar conta.' })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
      <FormInput
        label="Nome completo"
        icon={User}
        placeholder="Seu nome"
        error={errors.name?.message}
        {...register('name')}
      />
      <FormInput
        label="E-mail corporativo"
        icon={Mail}
        type="email"
        placeholder="nome@empresa.com"
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordStrengthField control={control} register={register} error={errors.password?.message} />
      <FormInput
        label="Confirmar Senha"
        icon={Lock}
        isPassword
        placeholder="••••••••"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword')}
      />

      <div>
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-zinc-700 bg-zinc-900 text-white focus:ring-0 cursor-pointer"
            {...register('acceptTerms')}
          />
          <div className="text-xs text-zinc-400 leading-tight">
            Aceito os{' '}
            <a href="#terms" className="text-zinc-200 hover:text-white underline decoration-zinc-700 underline-offset-2">Termos</a> e a{' '}
            <a href="#privacy" className="text-zinc-200 hover:text-white underline decoration-zinc-700 underline-offset-2">Privacidade</a>.
          </div>
        </label>
        {errors.acceptTerms && (
          <p className="text-[11px] text-red-400 mt-1">{errors.acceptTerms.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-white h-10 text-sm font-medium text-black transition-all hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed mt-1"
      >
        {isSubmitting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <>
            Criar conta
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  )
}

// ==========================================
// 6. COMPONENTE PRINCIPAL
// ==========================================

export default function Auth() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')
  const [feedback, setFeedback] = useState<FeedbackType>(null)

  const handleTabChange = (tab: 'login' | 'register') => {
    setActiveTab(tab)
    setFeedback(null)
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat p-4 font-sans text-zinc-100"
      style={{
        backgroundColor: '#000000d0', // Fundo preto puro base
        backgroundBlendMode: 'luminosity', // TIRA AS CORES da imagem (remove o verde/amarelo)
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.85), rgba(0,0,0, 0.95)), url('/Background.png')", // Corrigido path removendo o /public
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[850px] grid grid-cols-1 lg:grid-cols-2 bg-[#09090b] rounded-2xl border border-zinc-800/80 shadow-2xl overflow-hidden"
      >
        {/* Painel Esquerdo: Componentizado */}
        <LeftBrandingPanel />

        {/* Painel Direito: Formulários */}
        <div className="flex flex-col justify-center p-6 sm:p-8">
          <div className="w-full max-w-[340px] mx-auto space-y-5">
            
            {/* Logo Mobile */}
            <div className="flex lg:hidden items-center gap-2.5 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-black shadow-sm">
                <Command className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-white">NeverX</span>
            </div>

            {/* Cabeçalho e Abas */}
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white">
                  {activeTab === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h2>
                <p className="text-sm text-zinc-400 mt-0.5">
                  {activeTab === 'login'
                    ? 'Insira suas credenciais para acessar.'
                    : 'Preencha os dados abaixo para iniciar.'}
                </p>
              </div>

              {/* Seletor Segmentado */}
              <div className="flex rounded-lg bg-zinc-900/60 p-1 border border-zinc-800/60">
                {(['login', 'register'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => handleTabChange(tab)}
                    className="relative flex-1 py-1.5 text-sm font-medium transition-colors focus:outline-none"
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-zinc-800 rounded-md shadow-sm border border-zinc-700/50"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    <span className={`relative z-10 ${activeTab === tab ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
                      {tab === 'login' ? 'Entrar' : 'Cadastrar'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Alerta de Feedback */}
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className={`flex items-start gap-2 rounded-lg border p-3 text-xs ${
                    feedback.type === 'success'
                      ? 'border-green-500/20 bg-green-500/10 text-green-400'
                      : 'border-red-500/20 bg-red-500/10 text-red-400'
                  }`}
                >
                  {feedback.type === 'success' ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  <p className="mt-0.5">{feedback.message}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Formulários Dinâmicos */}
            <AnimatePresence mode="wait" custom={activeTab}>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: activeTab === 'login' ? -10 : 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: activeTab === 'login' ? 10 : -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'login' 
                  ? <LoginForm setFeedback={setFeedback} /> 
                  : <RegisterForm setFeedback={setFeedback} />}
              </motion.div>
            </AnimatePresence>

            {/* Divisor */}
            <div className="flex items-center gap-3 pt-1">
              <div className="h-px flex-1 bg-zinc-800" />
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-medium">Ou continue com</span>
              <div className="h-px flex-1 bg-zinc-800" />
            </div>

            {/* Botões Sociais: Componentizado */}
            <SocialButtons />

          </div>
        </div>
      </motion.div>
    </motion.main>
  )
}